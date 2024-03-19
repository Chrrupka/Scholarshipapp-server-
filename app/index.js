import Hapi from '@hapi/hapi'
import Blipp from 'blipp';
import config from './config';
import Good from 'good';
import HapiSwagger from 'hapi-swagger';
import bluebird from 'bluebird';
import mongoose from 'mongoose';
import routes from './REST/routes';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';

mongoose.Promise = bluebird;

mongoose.connect(
    config.databaseUrl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(() => {
        console.log("Couldn't connect to MongoDB");
    })

process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(value => process.exit(0))
        .catch(error => console.error('Mongoose default connection disconnected through app termination'));
});

const start = async () => {

    const server = new Hapi.server({
        port: config.port,
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type'],
                additionalHeaders: ['X-Requested-With']
            }
            }
    });

    const swaggerOptions = {
        info: {
            title: 'MY API',
            version: '1.0'
        }
    };

    const goodOptions = {
        ops: {
            interval: 1000
        },
        reporters: {
            myConsoleReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{log: '*', response: '*'}]
            }, {
                module: 'good-console'
            }, 'stdout'],
            myFileReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ops: '*'}]
            }, {
                module: 'good-squeeze',
                name: 'SafeJson'
            }],
            myHTTPReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{error: '*'}]
            }]
        }
    };

    await server.register([
        Blipp,
        Inert,
        Vision,
        {
            plugin: require('hapi-cors'),
            options: {
                origins: ['http://localhost:4200','http://localhost:3002'],
                methods: ['POST, GET, PATCH, PUT, DELETE'],
                headers: ['Accept', 'Content-Type', 'Authorization']
            }
        },
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        {
            plugin: Good,
            options: goodOptions
        }
    ]);

    server.route({
        method: 'GET',
        path: '/{param*}',
        config: {
            auth: false
        },
        handler: {
            file: 'public/index.html'
        }
    });

    try {
        await routes.secureRoutes(server);
        await routes.register(server);
        await server.start();
        console.info(`Server is listening on ${config.port}`);
    } catch (err) {
        console.error(err);
    }
};

start();
