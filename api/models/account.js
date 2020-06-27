const { loginRoute } = require('../modules/accounts/routes');

module.exports = function (Account) {
  loginRoute(Account);
};
