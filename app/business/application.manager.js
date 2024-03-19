import ApplicationDAO from '../DAO/applicationDAO';

function create(context){

    async function getAll(){
        return await ApplicationDAO.getAll();
    }
    async function getApplicationById(id){
        return await ApplicationDAO.getApplicationById(id);
    }

    async function createApplication(payload){
        return await ApplicationDAO.createApplication(payload);
    }
    async function updateApplication(id, payload){
        return await ApplicationDAO.updateApplication(id, payload);
    }
    async function removeApplicationById(id){
        return await ApplicationDAO.removeById(id);
    }
    return {
        getAll: getAll,
        createApplication: createApplication,
        updateApplication: updateApplication,
        removeApplicationById: removeApplicationById,
        getApplicationById: getApplicationById
    };
}

export default {
    create: create
}
