import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';

const studentEndpoint = {
    register(server) {
        server.route({
            method: 'POST',
            path: '/api/student',
            options: {
                description: 'Create a new student',
                tags: ['api'],
                 validate: {
                     payload: validator.createOrUpdateStudent.payload
                 },
                auth: 'bearer'
            },
            handler: async (request, h) => {
                try{
                return await business.getStudentManager(request).createStudent(request.payload);
                }catch(error){
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/api/student/{id}',
            options: {
                description: 'Get student by ID',
                tags: ['api'],
                 validate: {
                     params: validator.getById.params
                 }
            },
            handler: async (request, h) => {
                try{
                  return business.getStudentManager(request).getStudentById(request.params.id);
                }catch (error){
                  return applicationException.errorHandler(error,h);
                }
            }
        });

        server.route({
            method: 'PUT',
            path: '/api/student/{id}',
            options: {
                description: 'Update student by ID',
                tags: ['api'],
                validate: {
                     params: validator.createOrUpdateStudent.params,
                     payload: validator.createOrUpdateStudent.payload
                }
            },
            handler: async (request, h) => {
                try{
                  return await business.getStudentManager(request).updateStudent(request.params.id, request.payload);
                }catch (error){
                  return applicationException.errorHandler(error,h);
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/api/student/{id}',
            options: {
                description: 'Delete student by ID',
                tags: ['api'],
                 validate: {
                     params: validator.removeStudent.params
                 },
                auth: 'bearer'
            },
            handler: async (request, h) => {
                try{
                  return business.getStudentManager(request).removeStudentById(request.params.id);
                }catch (error){
                  return applicationException.errorHandler(error,h);
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/api/students',
            options: {
                description: 'Get all students',
                tags: ['api'],
                //validate: {},
                auth: false
            },
            handler: async (request, h) => {
                try {
                  return business.getStudentManager(request).getAll();
                }catch (error){
                  return applicationException.errorHandler(error,h);
                }
            }
        });
    },
    tag:{
        name:'student',
        description: 'Whem somobody wants to get student'
    }
};

export default studentEndpoint;
