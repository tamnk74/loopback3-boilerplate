'use strict';

module.exports = function enableAuthentication(server) {
  // enable authentication
  console.log('auth');
  server.enableAuth(); // { datasource: 'mongoDs' }
};