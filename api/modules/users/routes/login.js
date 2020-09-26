import Jwt from '../../../utils/Jwt';
import loginSchema from '../schemas/login';

export function loginRoute(User) {
  User.Login = async function (req, res, next) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        throw error;
      }
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user || !user.comparePassword(req.body.password)) {
        return next(new Error('LOG-0001'));
      }

      const token = Jwt.generateToken({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
      return next(null, {
        token_type: 'bearer',
        access_token: token,
        refresh_token: null,
      });
    } catch (error) {
      return next(error);
    }
  };

  User.remoteMethod('Login', {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'res', type: 'object', http: { source: 'res' } },
    ],
    http: { path: '/login', verb: 'post' },
    returns: { arg: 'data', type: 'object', root: true },
  });
}
