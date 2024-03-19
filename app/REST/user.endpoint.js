import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';


    const userEndpoint = {
      register(server) {
        server.route({
          method: 'POST',
          path: '/api/user/auth',
          options: {
            description: 'Authenticate user',
            tags: ['api'],
            validate: {
              payload: validator.authenticatePayload.payload
            },
            auth: false
          },
          handler: async (request, h) => {
            try {
              console.log(request.body);
              const { login, password } = request.payload;
              console.log(request.body);
              return await business.getUserManager(request).authenticate(login, password);
            } catch (error) {
              return applicationException.errorHandler(error, h);
            }
          }
        });

    server.route({
      method: 'POST',
      path: '/api/user/create',
      options: {
        description: 'Create or update user',
        tags: ['api'],
        validate: {
           payload: validator.createOrUpdateUser.payload
         },
        auth: 'bearer'
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).createNewOrUpdate(request.payload);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/all',
      options: {
        description: 'Get all users',
        tags: ['api'],
        validate: {},
        auth: 'bearer'
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).getAllUsers();
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'DELETE',
      path: '/api/user/remove/{id}',
      options: {
        description: 'Remove user',
        tags: ['api'],
         validate: {
          params: validator.removeById.params
         },
        auth: 'bearer'
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).removeUserById(request.params.id);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'DELETE',
      path: '/api/user/logout/{userId}',
      options: {
        description: 'Logout user',
        tags: ['api'],
         validate: {
           params: validator.removeUser.params
         },
        auth: 'bearer'
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).removeHashSession(request.params.userId);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/activate/{hash}',
      options: {
        description: 'Activate user',
        tags: ['api'],
/*         validate: {
           params: validator.activation.params
         },*/
        auth: false
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).activateUser(request.params.hash);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/{id}/generate/file',
      options: {
        description: 'Generate file about user',
        tags: ['api'],
        validate: {
           params: validator.activation.params
         },
        auth: false
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).activateUser(request.params.hash);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/email/{email}',
      options: {
        description: 'Check email availability',
        tags: ['api'],
        validate: {},
        auth: false
      },
      handler: async (request, h) => {
        try {
          return business.getUserManager(request).checkEmailAvailability(request.params.email);
        } catch (err) {
          return applicationException.errorHandler(err, h);
        }
      }
    });

  },
  tag: {
    name: 'user',
    description: 'When somebody login, signin or create user'
  }
};

export default userEndpoint;
