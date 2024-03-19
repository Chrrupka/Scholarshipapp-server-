import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import * as _ from 'lodash';

import PasswordModel from '../models/password';

async function createOrUpdate(data) {
  const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, _.omit(data, 'id'), { new: true });
  if (!result) {
    const result = await new PasswordModel({ userId: data.userId, password: data.password }).save();
    if (result) {
      return mongoConverter(result);
    }
  }
  return result;
}

async function authorize(userId, password) {
  const result = await PasswordModel.findOne({ userId: userId, password: password });
  if (result && mongoConverter(result)) {
    return true;
  }
  throw applicationException.new(applicationException.UNAUTHORIZED, 'User and password does not match');
}

export default {
  createOrUpdate: createOrUpdate,
  authorize: authorize
};
