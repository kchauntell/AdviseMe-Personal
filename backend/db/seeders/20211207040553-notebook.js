'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Notebooks', [
        {
          id: 1,
          title: 'Learn to Actively Listen',
          genre: 'General Relationships',
          hidden: false,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          title: 'What will a real friend do?',
          genre: 'Platonic Relationships',
          hidden: false,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          title: 'How to keep your Job!',
          genre: "Work Environment",
          hidden: false,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          title: 'How to survive Freshman Year',
          genre: 'School Environment',
          hidden: false,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          title: `Help Me! My Girlfriend trippin'...`,
          genre: 'Romance/Dating',
          hidden: false,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notebooks', null, {});

  }
};
