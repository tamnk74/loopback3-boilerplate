// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const bodyParser = require('body-parser');
const passport = require('passport');

const { jwtStrategy } = require('../configs/passport');
const app = loopback();

app.middleware('initial', bodyParser.urlencoded({ extended: true }));

// Jsonwebtoken authentification
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});

app.get('remoting').errorHandler = {
  handler: function (err, req, res, defaultHandler) {
    err = app.buildError(err);

    // send the error back to the original handler
    defaultHandler(err);
  },
  disableStackTrace: true,
};

app.buildError = function (err) {
  if (err.isJoi) {
    return {
      status: 422,
      code: 'ERR-0422',
      message: err.message,
      stack: err.stack,
      detail: err.detail,
    };
  }

  err.status = err.statusCode;
  delete err.statusCode;

  return err;
};

export default app;
