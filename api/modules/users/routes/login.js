import Jwt from '../../../utils/Jwt';
import loginSchema from '../schemas/login';

export function loginRoute(User) {
  User.Login = async function (email, password) {
    const { error } = loginSchema.validate({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user || !user.comparePassword(password)) {
      throw Error('LOG-0001');
    }

    const token = Jwt.generateToken({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

    return {
      token_type: 'bearer',
      access_token: token,
      refresh_token: null,
    };
  };

  User.remoteMethod('Login', {
    accepts: [
      { arg: 'email', type: 'string', required: true },
      { arg: 'password', type: 'string', required: true },
    ],
    http: { path: '/login', verb: 'post' },
    returns: { arg: 'data', type: 'object', root: true },
  });
}
