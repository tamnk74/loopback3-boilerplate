import Jwt from '../../../utils/Jwt';
import registerSchema from '../schemas/register';

export function registerRoute(User) {
  User.Register = async function (username, email, password, next) {
    const data = {
      username,
      email,
      password,
    };
    const { error } = registerSchema.validate(data);
    if (error) {
      throw error;
    }
    const user = await User.create(data);

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

  User.remoteMethod('Register', {
    accepts: [
      { arg: 'username', type: 'string', required: true },
      { arg: 'email', type: 'string', required: true },
      { arg: 'password', type: 'string', required: true },
    ],

    http: { path: '/register', verb: 'post' },
    returns: { arg: 'data', type: 'object', root: true },
  });
}
