import StudentDAO from '../DAO/studentDAO';

function create(context) {

        async function createStudent(payload) {
            return await StudentDAO.createStudent(payload);
        }

        async function getStudentById(id) {
            return await StudentDAO.getStudentById(id);
        }

        async function updateStudent(id, payload) {
            return await StudentDAO.updateStudent(id, payload);

        }

        async function removeStudentById(id) {
            return await StudentDAO.removeById(id);

        }

        async function getAll() {
            return await StudentDAO.getAll();
        }

        return {
            createStudent: createStudent,
            getStudentById: getStudentById,
            updateStudent: updateStudent,
            removeStudentById: removeStudentById,
            getAll: getAll
        };
}
export default {
    create:create
};
