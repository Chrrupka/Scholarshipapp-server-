import hapiAuthBearerToken from 'hapi-auth-bearer-token';
import business from '../business/business.container';
import userEndpoint from './user.endpoint';
import applicationEndpoint from './application.endpoint';
import attachmentEndpoint from './attachment.endpoint';
import detailsEndpoint from './details.endpoint';
import studentEndpoint from './student.endpoint';

const routes = {
  async secureRoutes(server) {
    await server.register(hapiAuthBearerToken);
    server.auth.strategy('bearer', 'bearer-access-token', {
      allowQueryToken: true,
      validate: async (request, token, h) => {
        let isValid;
        try {
          const user = await business.getUserManager().getUserByToken(token);
          isValid = !!user;
        } catch (e) {
          isValid = false;
          console.error('Token is not valid!')
        }

        const credentials = { token };
        const artifacts = { test: 'info' };

        return { isValid, credentials, artifacts };
      }
    });
    server.auth.default('bearer');
  },
  register(server) {
    userEndpoint.register(server);
    applicationEndpoint.register(server);
    attachmentEndpoint.register(server);
    detailsEndpoint.register(server);
    studentEndpoint.register(server);
  },
  tags() {
    return [
        userEndpoint.tag,
        applicationEndpoint.tag,
        attachmentEndpoint.tag,
        detailsEndpoint.tag,
        studentEndpoint.tag

    ];
  }
};

export default routes;
