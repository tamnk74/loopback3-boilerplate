// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = async function (app) {
  try {
    const User = app.models.user;

    await User.upsertWithWhere({ email: 'admin@mailinator.com' }, { username: 'admin', email: 'admin@mailinator.com', password: 'admin123' });
    await User.upsertWithWhere({ email: 'tamnk74@gmail.com' }, { username: 'tamnk', email: 'tamnk74@gmail.com', password: 'tamnk123' });
    await User.upsertWithWhere({ email: 'user@mailinator.com' }, { username: 'user', email: 'user@mailinator.com', password: 'user123' });
  }
  catch (error) {
    console.trace(error)
  }
};