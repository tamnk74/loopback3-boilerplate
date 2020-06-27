
export default function (Account) {
  Account.login = async (context, data, next) => {
    try {
      console.log(context, data, next);
      console.log(11111111, argument);
      next(null, { msg: 'done' });
    } catch (error) {
      return next(error);
    }
  };

  Account.remoteMethod(
    'login',
    {
      accepts: [
        { arg: 'data', type: 'object', http: { source: 'req' } }
      ],
      http: { path: '/login', verb: 'post' },
      returns: { arg: 'data', type: 'object' }
    }
  );
};
