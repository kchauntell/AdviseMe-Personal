'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');
const user = require('../models/user');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
    {
      firstName: 'Demo',
      lastName: 'User',
      username: 'DemoUs',
      email: 'demo@demouser.io',
      hashedPassword: bcrypt.hashSync('p@sswordDemo1')
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: 'FakeUser1',
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password())
    }
  ], {});

  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoUs', 'FakeUser1'] }
    }, {});
  }
};
