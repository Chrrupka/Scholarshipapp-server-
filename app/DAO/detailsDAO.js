import ApplicationModel from '../models/application';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';

import DetailsModel from '../models/details';
import * as _ from 'lodash';
async function createDetails(payload) {
    const data = await DetailsModel(payload).save();
    if (data) {
        return mongoConverter(data);
    }
    throw applicationException.new(applicationException.ERROR, 'Cannot create new details');
}

async function getDetailsById(id) {
    const result= await DetailsModel.findById(id);
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Details not found');
}

async function updateDetails(id, payload) {
    const data = await DetailsModel.findByIdAndUpdate(id, _.omit(payload, 'id'), { upsert: true, new: true });
    if (data) {
        return mongoConverter(data);
    }
    throw applicationException.new(applicationException.ERROR, 'Cannot update details');
}

async function removeById(id) {
    return await DetailsModel.findByIdAndDelete(id);
}

async function getAll() {
    const result = await DetailsModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Details not found');
}

export default {
    createDetails: createDetails,
    getDetailsById: getDetailsById,
    updateDetails: updateDetails,
    removeById: removeById,
    getAll: getAll
};
