import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import StudentModel from '../models/student'
import ApplicationModel from '../models/application';
import AttachmentModel from '../models/attachment'
import DetailsModel from '../models/details'
import * as _ from 'lodash';
import mongoose from "mongoose";

async function getAll() {
    const result = await ApplicationModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Applications not found');
}

async function getApplicationById(id) {
    const application = await ApplicationModel.findById(id);
    const attachment = await AttachmentModel.find({applicationId:id});
    const details = await DetailsModel.find({applicationId:id})
    const student = await StudentModel.find({applicationId:id})
    if (application && attachment && details && student) {
        const app = mongoConverter(application);
        const att = mongoConverter(attachment);
        const det = mongoConverter(details);
        const stu = mongoConverter(student);
        return {app, att, det, stu}
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Applications not found');
}

async function createApplication(payload) {
    const applicationToSave = {
        type: payload.type,
        status: payload.status
    };

    const savedApplication = await ApplicationModel(applicationToSave).save();
    if (savedApplication) {
        const convertedApplication = mongoConverter(savedApplication);
        await AttachmentModel.updateMany(
            {_id: new mongoose.Types.ObjectId(payload.attachment_id)},
            {$set: {applicationId: convertedApplication.id}},
            { new: true });

        await DetailsModel.updateMany(
            {_id: new mongoose.Types.ObjectId(payload.details_id)},
            {$set: {applicationId: convertedApplication.id}},
            { new: true });

        await StudentModel.findOneAndUpdate(
            {album_id: payload.album_id},
            {$set: {applicationId: convertedApplication.id}},
            { new: true });

        const updatedAttachments = await AttachmentModel.find({_id: new mongoose.Types.ObjectId(payload.attachment_id)});
        const updatedDetails = await DetailsModel.find({_id: new mongoose.Types.ObjectId(payload.details_id)});
        const updatedStudent = await StudentModel.findOne({album_id: payload.album_id});

        const convertedAttachments = mongoConverter(updatedAttachments);
        const convertedDetails = mongoConverter(updatedDetails);
        const convertedStudent = mongoConverter(updatedStudent);
        return {
            convertedApplication,
            convertedAttachments,
            convertedDetails,
            convertedStudent
        };
    }
    throw applicationException.new(applicationException.ERROR, 'Cannot create new application');
}


async function updateApplication(id, payload) {
    const application = await ApplicationModel.findByIdAndUpdate(id, _.omit(payload, 'id'), { new: true });
    if (!application) {
        throw applicationException.new(applicationException.ERROR, 'Cannot update application');
    }
    const applicationId = application._id;

    if (payload.attachment_id) {
        await AttachmentModel.updateMany(
            { _id: { $in: payload.attachment_id.map(id => new mongoose.Types.ObjectId(id)) } },
            { $set: { applicationId: applicationId } },
            { new: true }
        );
    }

    if (payload.details_id) {
        await DetailsModel.updateMany(
            { _id: { $in: payload.details_id.map(id => new mongoose.Types.ObjectId(id)) } },
            { $set: { applicationId: applicationId } },
            { new: true }
        );
    }

    if (payload.album_id) {
        await StudentModel.findOneAndUpdate(
            { album_id: payload.album_id },
            { $set: { applicationId: applicationId } },
            { new: true }
        );
    }

    const updatedAttachments = payload.attachment_id ? await AttachmentModel.find({ _id: { $in: payload.attachment_id.map(id => new mongoose.Types.ObjectId(id)) } }) : [];
    const updatedDetails = payload.details_id ? await DetailsModel.find({ _id: { $in: payload.details_id.map(id => new mongoose.Types.ObjectId(id)) } }) : [];
    const updatedStudent = payload.album_id ? await StudentModel.findOne({ album_id: payload.album_id }) : null;

    const convertedApplication = mongoConverter(application);
    const convertedAttachments = mongoConverter(updatedAttachments);
    const convertedDetails = mongoConverter(updatedDetails);
    const convertedStudent = mongoConverter(updatedStudent);

    return {
        convertedApplication,
        convertedAttachments,
        convertedDetails,
        convertedStudent
    };
}

async function removeById(id) {
    return ApplicationModel.findByIdAndDelete(id);
}


export default {
    getAll: getAll,
    getApplicationById: getApplicationById,
    createApplication: createApplication,
    updateApplication: updateApplication,
    removeById: removeById
};
