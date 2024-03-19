import AttachmentDAO from '../DAO/attachmentDAO';

function create(context) {
    async function createAttachment(payload) {
        return await AttachmentDAO.createAttachment(payload);
    }

    async function getAttachmentById(id) {
        return await AttachmentDAO.getAttachmentById(id);
    }

    async function removeAttachmentById(id) {
        return await AttachmentDAO.removeById(id);

    }

    return {
        createAttachment: createAttachment,
        getAttachmentById: getAttachmentById,
        removeAttachmentById: removeAttachmentById
    };
}
export default {
    create:create
}
