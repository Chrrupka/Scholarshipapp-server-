import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';

const detailsEndpoints = {
    register(server) {
        server.route({
                method: 'GET',
                path: '/api/details',
                options: {
                    description: 'Get all student application details',
                    tags: ['api'],
                    validate: {},
                    auth: false
                },
                handler: async (request, h) => {
                    try {
                        return await business.getDetailsManager(request).getAll();
                    } catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                }
        });

        server.route({
                method: 'GET',
                path: '/api/details/{id}',
                options: {
                    description: 'Get student application details by ID',
                    tags: ['api'],
                     validate: {
                         params: validator.getById.params
                     },
                    auth: 'bearer'
                },
                handler: async (request, h) => {
                    try {
                        return await business.getDetailsManager(request).getDetailsById(request.params.id);
                    } catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                }
        });

        server.route({
            method: 'POST',
                path: '/api/details',
                options: {
                    description: 'Create new application details',
                    tags: ['api'],
                     validate: {
                         payload: validator.createOrUpdateDetails.payload
                     },
                    auth: 'bearer'
                },
                handler: async (request, h) => {
                    try {
                        return await business.getDetailsManager(request).createDetails(request.payload);
                    } catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                }
        });

        server.route({
                method: 'PUT',
                path: '/api/details/{id}',
                options: {
                    description: 'Update application details',
                    tags: ['api'],
                     validate: {
                          params: validator.createOrUpdateDetails.params,
                          payload: validator.createOrUpdateDetails.payload
                     },
                    auth: 'bearer'
                },
                handler: async (request, h) => {
                    try {
                        return await business.getDetailsManager(request).updateDetails(request.params.id, request.payload);
                    } catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                }
        });

        server.route({
                method: 'DELETE',
                path: '/api/details/{id}',
                options: {
                    description: 'Delete application details',
                    tags: ['api'],
                    // validate: {
                    //     //params: validator.removeDetails.params
                    // },
                    auth: 'bearer'
                },
                handler: async (request, h) => {
                    try {
                        return await business.getDetailsManager(request).removeDetailsById(request.params.id);
                    } catch (error) {
                        return applicationException.errorHandler(error, h);
                    }
                }
        });
    },
    tag: {
        name: 'details',
        description: 'When somebody wants to get details'
    }
};

export default detailsEndpoints;
