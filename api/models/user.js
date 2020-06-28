import { loginRoute, meRoute } from '../modules/users/routes';
import bcryptjs from 'bcryptjs';

export default function (User) {
  User.prototype.comparePassword = function (password) {
    console.log('PASS', password, this.password);
    return bcryptjs.compareSync(password, this.password);
  };
  User.disableRemoteMethod('login', true);
  User.disableRemoteMethod('logout', true);
  User.disableRemoteMethod('exists', true);
  User.disableRemoteMethod('count', true);
  User.disableRemoteMethod('setPassword', true);
  User.disableRemoteMethod('changePassword', true);
  User.disableRemoteMethod('resetPassword', true);
  User.disableRemoteMethod('confirm', true);
  User.disableRemoteMethod('findById', true);
  User.disableRemoteMethod('deleteById', true);
  User.disableRemoteMethod('find', true);
  User.disableRemoteMethod('findOne', true);
  User.disableRemoteMethod('create', true);
  User.disableRemoteMethod('createChangeStream', true);
  User.disableRemoteMethod('verify', true);
  User.disableRemoteMethod('replace', true);
  User.disableRemoteMethod('replaceOrCreate', true);
  User.disableRemoteMethod('upsertWithWhere', true);
  loginRoute(User);
  meRoute(User);
};
