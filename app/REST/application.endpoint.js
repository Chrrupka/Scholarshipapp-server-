import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';

const applicationEndpoints = {
    register(server) {
        server.route({
                method: 'GET',
                path: '/api/applications',
                options: {
                    description: 'Get all applications',
                    tags: ['api'],
                    validate: {},
                    auth: false
                },
                handler: async (request, h) => {
                    try {
                        return await business.getApplicationManager(request).getAll();
                    }catch (error){
                        return applicationException.errorHandler(error,h);
                    }
                }
            });

        server.route({
                method: 'GET',
                path: '/api/application/{id}',
                options: {
                    description: 'Get an application by ID',
                    tags: ['api'],
                     validate: {
                         params: validator.getById.params
                     },
                    auth: 'bearer'
                },
                handler: async (request, h) => {
                    try{
                        return await business.getApplicationManager(request).getApplicationById(request.params.id);
                    }catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                },
            });

        server.route({
                method: 'POST',
                path: '/api/application',
                options: {
                    description: 'Create a new application',
                    tags: ['api'],
                     validate: {
                        // payload: validator.createOrUpdateApplication.payload
                     },
                    auth: 'bearer'
                },
                handler: async (request, h) => {
                    try{
                        return await business.getApplicationManager(request).createApplication(request.payload);
                    }catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                }
            });

        server.route({
                method: 'PUT',
                path: '/api/application/{id}',
                options: {
                    description: 'Update an application',
                    tags: ['api'],
                    // validate: {
                    //     // params: validator.createOrUpdateApplication.params,
                    //     // payload: validator.createOrUpdateApplication.payload
                    // },
                    auth: 'bearer'
                },
                handler: async (request, h) => {
                    try{
                        return await business.getApplicationManager(request).updateApplication(request.params.id, request.payload);
                    }catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                }

            });
        server.route({
                method: 'DELETE',
                path: '/api/application/{id}',
                options: {
                    description: 'Delete an application',
                    tags: ['api'],
                    // validate: {
                    //     //params: validator.removeApplication.params
                    // },
                    auth: 'bearer'
                },
                handler: async (request, h) => {
                    try{
                        return await business.getApplicationManager(request).removeApplicationById(request.params.id);
                    }catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                }
        });
    },
    tag: {
        name: 'application',
        description: 'When somebody wants to get books'
    }
}

export default applicationEndpoints;
