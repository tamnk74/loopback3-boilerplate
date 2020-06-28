import { loginRoute, meRoute } from '../modules/users/routes';
import bcryptjs from 'bcryptjs';

const disableRemoteMethods = [
  'login',
  'logout',
  'exists',
  'count',
  'setPassword',
  'changePassword',
  'resetPassword',
  'confirm',
  'deleteById',
  'find',
  'findOne',
  'findById',
  'create',
  'createChangeStream',
  'verify',
  'replace',
  'replaceOrCreate',
  'replaceById',
  'updateAll',
  'upsert',
  'upsertWithWhere',
  'prototype.__count__accessTokens',
  'prototype.__create__accessTokens',
  'prototype.__delete__accessTokens',
  'prototype.__destroyById__accessTokens',
  'prototype.__findById__accessTokens',
  'prototype.__get__accessTokens',
  'prototype.__updateById__accessTokens',
];

export default function (User) {
  User.prototype.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
  };
  disableRemoteMethods.forEach(method => User.disableRemoteMethodByName(method));

  loginRoute(User);
  meRoute(User);
};
