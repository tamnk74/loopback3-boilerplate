import * as userRoutes from '../modules/users/routes';
import bcryptjs from 'bcryptjs';

export default function (User) {
  const salt = bcryptjs.genSaltSync(10);
  User.prototype.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
  };
  User.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      ctx.instance.password = bcryptjs.hashSync(ctx.instance.password, salt);
    } else {
      ctx.data.password = bcryptjs.hashSync(ctx.data.password, salt);
    }
    next();
  });

  Object.keys(userRoutes).forEach((route) => userRoutes[route](User));
}
