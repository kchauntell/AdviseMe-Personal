'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Advice', [
      {
        id: 1,
        advice: `I definitely feel where you are coming from. I have had issues with actively listening to all the important people in my life. These are some tips have have helped me become a better listener for my loved ones ...` ,
        userId: 1,
        notesId: 1,
        hidden: false
      },
      {
        id: 2,
        advice: `Yep, they straight up betrayed you. People be so disloyal, not even funny!!!`,
        userId: 1,
        notesId: 2,
        hidden: false
      },
      {
        id: 3,
        advice: `For real, report them if all else fails. They are human, but at the same time, respectively decline the disrespect.`,
        userId: 2,
        notesId: 3,
        hidden: false
      }
  ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Advice', null, {});
  }
};
