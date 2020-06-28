// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = async function (app) {
  try {
    const User = app.models.user;
    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;

    const adminRole = await Role.upsertWithWhere({
      name: 'admin'
    }, {
      name: 'admin'
    });
    const userRole = await Role.upsertWithWhere({
      name: 'user'
    }, {
      name: 'user'
    })
    const admin = await User.upsertWithWhere({ email: 'admin@mailinator.com' }, { username: 'admin', email: 'admin@mailinator.com', password: 'admin123' });
    const user = await User.upsertWithWhere({ email: 'user@mailinator.com' }, { username: 'user', email: 'user@mailinator.com', password: 'user123' });

    await adminRole.principals.create({
      principalType: RoleMapping.USER,
      principalId: admin.id
    })

    await userRole.principals.create({
      principalType: RoleMapping.USER,
      principalId: user.id
    })
  }
  catch (error) {
    console.trace(error)
  }
};