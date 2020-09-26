export function meRoute(User) {
  User.me = async function (req, res, next) {
    try {
      const { user } = req;
      return next(null, { user });
    } catch (error) {
      return next(error);
    }
  };

  User.remoteMethod('me', {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'res', type: 'object', http: { source: 'res' } },
    ],
    http: { path: '/me', verb: 'get' },
    returns: { arg: 'data', type: 'object' },
  });
}
