
require('dotenv').config();

export default function (options) {
  return function authenticate(req, res, next) {
    console.log('auth ', options, req);
    return next();
  };
};
