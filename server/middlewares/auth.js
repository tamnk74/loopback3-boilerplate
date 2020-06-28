

require('dotenv').config();

export default function (options) {
  return function authenticate(err, req, res, next) {
    console.log('AUTH', req.headers);
    if (err) {
      return next(err);
    }

    return next();
  };
};
