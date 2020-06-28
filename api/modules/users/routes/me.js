
export default function (Account) {
  Account.me = async function (req, res, next) {
    try {
      console.log('Me', req);
      return next(null, { msg: 'logged in' });
    } catch (error) {
      return next(error);
    }
  };

  Account.remoteMethod(
    'me',
    {
      accepts: [
        { arg: 'req', type: 'object', http: { source: 'req' } },
        { arg: 'res', type: 'object', http: { source: 'res' } },
      ],
      http: { path: '/me', verb: 'get' },
      returns: { arg: 'data', type: 'object' }
    }
  );
};
