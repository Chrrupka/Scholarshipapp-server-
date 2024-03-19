import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';

import AttachmentModel from '../models/attachment';

async function createAttachment(payload) {
    const data = await AttachmentModel(payload).save();
    if (data) {
        return mongoConverter(data);
    }
    throw applicationException.new(applicationException.ERROR, 'Cannot create new attachment');
}

async function getAttachmentById(id) {
    const result = await AttachmentModel.findById(id);
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Attachment not found');
}

async function removeById(id) {
    return await AttachmentModel.findByIdAndDelete(id);
}


export default {
    createAttachment: createAttachment,
    getAttachmentById: getAttachmentById,
    removeById: removeById
};
