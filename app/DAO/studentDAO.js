import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';

import StudentModel from '../models/student';
import * as _ from 'lodash';

async function createStudent(payload) {
    const data = await StudentModel(payload).save();
    if (data) {
        return mongoConverter(data);
    }
    throw applicationException.new(applicationException.ERROR, 'Cannot create new student');
}

async function getStudentById(id) {
    const result = await StudentModel.findById(id);
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Student not found');
}

async function updateStudent(id, payload) {
    const data = await StudentModel.findByIdAndUpdate(id, _.omit(payload, 'id'), { upsert: true, new: true });
    if (data) {
        return mongoConverter(data);
    }
    throw applicationException.new(applicationException.ERROR, 'Cannot update student');
}

async function removeById(id) {
    return await StudentModel.findByIdAndDelete(id);
}

async function getAll() {
    const result = await StudentModel.find();
    if (result){
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, "Students not found");
}

export default {
    createStudent: createStudent,
    getStudentById: getStudentById,
    updateStudent: updateStudent,
    removeById:  removeById,
    getAll: getAll
};
