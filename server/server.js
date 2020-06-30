// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const bodyParser = require('body-parser');
const passport = require('passport');
// const loopbackPassport = require('loopback-component-passport');

const { jwtStrategy } = require('../configs/passport');
const app = loopback();
// const PassportConfigurator = loopbackPassport.PassportConfigurator;
// const passportConfigurator = new PassportConfigurator(app);

app.middleware('initial', bodyParser.urlencoded({ extended: true }));

// passportConfigurator.init();
// passportConfigurator.setupModels({
//   userModel: app.models.user,
//   userIdentityModel: app.models.userIdentity,
//   userCredentialModel: app.models.userCredential,
// });

// Jsonwebtoken authentification
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// app.middleware('auth', loopback.token());
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
  if (require.main === module)
    app.start();
});

app.get('remoting').errorHandler = {
  handler: function (err, req, res, defaultHandler) {
    err = app.buildError(err);

    // send the error back to the original handler
    defaultHandler(err);
  },
  disableStackTrace: true
};

app.buildError = function (err) {
  err.status = err.statusCode; // override the status

  // remove the statusCode property
  delete err.statusCode;

  return err;
};

export default app;