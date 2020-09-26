import Jwt from '../../../utils/Jwt';
import registerSchema from '../schemas/register';

export function registerRoute(User) {
  User.Register = async function (req, res, next) {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        throw error;
      }
      const user = await User.create({
        ...req.body,
        password: req.body.password,
      });

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

  User.remoteMethod('Register', {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'res', type: 'object', http: { source: 'res' } },
    ],
    http: { path: '/register', verb: 'post' },
    returns: { arg: 'data', type: 'object', root: true },
  });
}
