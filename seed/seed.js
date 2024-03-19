import ApplicationModel from '../app/models/application';
import AttachmentModel from '../app/models/attachment';
import DetailsModel from '../app/models/details';
import StudentModel from '../app/models/student';
import config from '../app/config';
import mongoose from 'mongoose';
import PasswordModel from '../app/models/password';
import Promise from 'bluebird';
import TokenModel from '../app/models/token';
import UserModel from '../app/models/user';

function prepare() {
    return UserModel.deleteMany({})
        .then(() => {
            return TokenModel.deleteMany({});
        }).then(() => {
            return PasswordModel.deleteMany({});
        }).then(() => {
            return ApplicationModel.deleteMany({});
        }).then(() => {
            return AttachmentModel.deleteMany({});
        }).then(() => {
            return DetailsModel.deleteMany({});
        }).then(() => {
            return StudentModel.deleteMany({});
        });
}

function seed() {
    return UserModel.create(require('./seedSchemas/user.json'))
        .then(() => {
            return PasswordModel.create(require('./seedSchemas/password.json'));
        })
        .then(() => {
            return ApplicationModel.create(require('./seedSchemas/application.json'));
        })
        .then(() => {
            return AttachmentModel.create(require('./seedSchemas/attachment.json'));
        })
        .then(() => {
            return DetailsModel.create(require('./seedSchemas/details.json'));
        })
        .then(() => {
            return StudentModel.create(require('./seedSchemas/student.json'));
        });
}

(function run() {
    mongoose.connect(
        config.databaseUrl)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(() => {
            console.log("Couldn't connect to MongoDB");
        })


    console.info(`Seeding script starts at ${new Date()}`);

    return Promise.resolve().then(() => {
        return prepare();
    }).then(() => {
        return seed();
    }).catch(error => {
        console.error(`error: ${error}`);
        process.exit(1);
    }).finally(function () {
        process.on('SIGINT', () => {
            mongoose.connection.close()
                .then(value => {
                    console.error('Connection with database closed');
                    console.info(`Seeding script finished at ${new Date()}`);
                    process.exit(0);
                })
                .catch(error => console.error('Mongoose default connection disconnected through app termination'));
        });
    });
})();
