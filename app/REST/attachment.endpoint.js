import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';

const attachmentEndpoint = {
    register(server) {
        server.route({
            method: 'POST',
            path: '/api/attachment',
            options: {
                description: 'Create a new attachment',
                tags: ['api'],
                 validate: {
                    payload: validator.createAttachment.payload
                 },
                auth: 'bearer'
            },
            handler: async (request, h) => {
                try {
                    return await business.getAttachmentManager(request).createAttachment(request.payload);
                } catch (error) {
                    return applicationException.errorHandler(error, h);
                }
            }
        });
        server.route({
            method: 'GET',
            path: '/api/attachment/{id}',
            options: {
                description: 'Get an attachment by ID',
                tags: ['api'],
                 validate: {
                     params: validator.getById.params
                 },
                auth: 'bearer'
            },
            handler: async (request, h) => {
                try {
                    return await business.getAttachmentManager(request).getAttachmentById(request.params.id);
                } catch (error) {
                    return applicationException.errorHandler(error, h);
                }
            }
        });
        server.route({
            method: 'DELETE',
            path: '/api/attachment/{id}',
            options: {
                description: 'Delete an attachment',
                tags: ['api'],
                 validate: {
                     params: validator.removeAttachment.params
                 },
                auth: 'bearer'
            },
            handler: async (request, h) => {
                try {
                    return await business.getAttachmentManager(request).removeAttachmentById(request.params.id);
                } catch (error) {
                    return applicationException.errorHandler(error, h);
                }
            }
        });
    },
    tag: {
        name: 'attachment',
        description: 'When somebody wants to get attachment'
    }
};
export default attachmentEndpoint;
