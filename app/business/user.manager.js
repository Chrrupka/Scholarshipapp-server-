import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import UserDAO from '../DAO/userDAO';

import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import * as _ from 'lodash';


function create(context) {

  function hashString(password) {
    return sha1(password);
  }

  async function authenticate(name, password) {
    let userData;
    const user = await UserDAO.getByEmail(name);
    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    if (!user.active) {
      throw applicationException.new(applicationException.NOT_FOUND, 'User does not exist or does not active');
    }
    userData = await user;
    await PasswordDAO.authorize(user.id, hashString(password));
    const token = await TokenDAO.create(userData);
    return getToken(token);
  }

  function getToken(token) {
    return { token: token.value };
  }

  async function getUserByToken(receivedToken) {
    const token = await TokenDAO.get(receivedToken);
    return await UserDAO.get(token.userId);
  }

  async function createNewOrUpdate(userData) {
    userData.activationHash = hashString(Date.now().toString());
    const user = await UserDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({ userId: user.id, password: hashString(userData.password) });
    } else {
      return user;
    }
  }

  async function getAllUsers() {
    return await UserDAO.getAllUsers();
  }

  async function removeUserById(id) {
    return await UserDAO.removeById(id);
  }

  async function activateUser(hash) {
    const user = await UserDAO.getUserByActivationHash(hash);
    if (user) {
      user.active = true;
      user.activationHash = '';
      return await UserDAO.createNewOrUpdate(user);
    }
    throw applicationException.new(applicationException.NOT_FOUND,
      'User with that activate hash does not exist');
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }

  async function checkEmailAvailability(email) {
    const user = await UserDAO.checkAvailability(email);
    if (user) {
      return !(_.filter(user, { 'email': email }).length);
    }

  }

  return {
    authenticate: authenticate,
    getUserByToken: getUserByToken,
    createNewOrUpdate: createNewOrUpdate,
    getAllUsers: getAllUsers,
    removeUserById: removeUserById,
    activateUser: activateUser,
    removeHashSession: removeHashSession,
    checkEmailAvailability: checkEmailAvailability
  };
}

export default {
  create: create
};
