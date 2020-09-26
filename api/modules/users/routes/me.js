export function meRoute(User) {
  User.me = async function (req) {
    const { user } = req;
    return { user };
  };

  User.remoteMethod('me', {
    accepts: [{ arg: 'req', type: 'object', http: { source: 'req' } }],
    http: { path: '/me', verb: 'get' },
    returns: { arg: 'data', type: 'object' },
  });
}
