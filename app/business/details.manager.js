import DetailsDAO from '../DAO/detailsDAO';

function create(context)  {

    async function createDetails(payload) {
            return await DetailsDAO.createDetails(payload);
    }

    async function getDetailsById(id) {
            return await DetailsDAO.getDetailsById(id);
    }
    async function getAll(){
        return await DetailsDAO.getAll();
    }

    async function updateDetails(id, payload) {
            return await DetailsDAO.updateDetails(id, payload);
    }

    async function removeDetailsById(id) {
          return await DetailsDAO.removeById(id);
    }
    return{
        createDetails: createDetails,
        getDetailsById: getDetailsById,
        updateDetails: updateDetails,
        removeDetailsById: removeDetailsById,
        getAll: getAll
    };
}

export default {
    create: create
}
