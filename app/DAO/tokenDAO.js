import config from '../config';
import momentWrapper from '../service/momentWrapper';
import jwt from 'jsonwebtoken';
import mongoConverter from '../service/mongoConverter';
import applicationException from '../service/applicationException';

import TokenModel from '../models/token';

async function create(user) {
  const access = 'auth';
  const userData = {
    userId: user.id, name: user.email, role: user.role, isAdmin: user.isAdmin, access: access
  };
  const value = jwt.sign(userData, config.JwtSecret, { expiresIn: '3h' });
  const result = await TokenModel({
    userId: user.id, type: 'authorization', value: value, createDate: momentWrapper.get().valueOf()
  }).save();
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.BAD_REQUEST, error.message);
}

async function get(tokenValue) {
  const result = await TokenModel.findOne({ value: tokenValue });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.UNAUTHORIZED, 'Token not found');
}

async function remove(userId) {
  return await TokenModel.remove({ userId: userId });
}

export default {
  create: create,
  get: get,
  remove: remove
};
