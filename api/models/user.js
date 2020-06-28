import { loginRoute, meRoute } from '../modules/users/routes';
import bcryptjs from 'bcryptjs';

const disableRemoteMethods = [
  'count',
  'create',
  'createChangeStream',
  'changePassword',
  'confirm',
  'deleteById',
  'exists',
  'find',
  'findOne',
  'findById',
  'login',
  'logout',
  'prototype.updateAttributes',
  'prototype.verify',
  'prototype.__count__accessTokens',
  'prototype.__create__accessTokens',
  'prototype.__delete__accessTokens',
  'prototype.__destroyById__accessTokens',
  'prototype.__findById__accessTokens',
  'prototype.__get__accessTokens',
  'prototype.__updateById__accessTokens',
  'replace',
  'replaceOrCreate',
  'replaceById',
  'resetPassword',
  'setPassword',
  'update',
  'updateAll',
  'upsert',
  'upsertWithWhere',
  'verify',
];

export default function (User) {
  User.prototype.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
  };
  disableRemoteMethods.forEach(method => User.disableRemoteMethodByName(method));

  loginRoute(User);
  meRoute(User);
};
