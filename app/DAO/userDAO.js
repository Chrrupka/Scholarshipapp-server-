import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import Promise from 'bluebird';
import * as _ from 'lodash';

import UserModel from '../models/user';


function createNewOrUpdate(user) {
  return Promise.resolve().then(() => {
    if (!user.id) {
      return new UserModel(user).save().then(result => {
        if (result) {
          return mongoConverter(result);
        }
      });
    } else {
      return UserModel.findByIdAndUpdate(user.id, _.omit(user, 'id'), { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}

async function getByEmail(name) {
  const result = await UserModel.findOne({ email: name });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getUserByActivationHash(hash) {
  const user = await UserModel.find({ activationHash: hash });
  if (user) {
    return mongoConverter(user);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function get(id) {
  const result = await UserModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getAllUsers() {
  const result = await UserModel.find({});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'Users not found');
}

async function removeById(id) {
  return await UserModel.findByIdAndDelete(id);
}

async function checkAvailability() {
  const data = await UserModel.find();
  if (data) {
    return mongoConverter(data);
  }
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmail: getByEmail,
  getUserByActivationHash: getUserByActivationHash,
  get: get,
  getAllUsers: getAllUsers,
  removeById: removeById,
  checkAvailability: checkAvailability
};
