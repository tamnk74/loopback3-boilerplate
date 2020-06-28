import Jwt from '../../../utils/Jwt';

export default function (User) {
  User.Login = async function (req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!user || !user.comparePassword(req.body.password)) {
        return next({
          status: 400,
          title: 'Bad Request',
          detail: 'Incorrect username or password',
        })
      }

      const token = Jwt.generateToken({
        id: user.id,
      })
      return next(null, {
        token_type: 'bearer',
        access_token: token,
        refresh_token: null,
      });
    } catch (error) {
      return next(error);
    }
  };

  User.remoteMethod(
    'Login',
    {
      accepts: [
        { arg: 'req', type: 'object', http: { source: 'req' } },
        { arg: 'res', type: 'object', http: { source: 'res' } },
      ],
      http: { path: '/login', verb: 'post' },
      returns: { arg: 'data', type: 'object', root: true }
    }
  );
};
