'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [
      {
        id: 1,
        title: 'Part 1: Beginning to Listen',
        note: 'There are a lot of things that people will say about being a good listener, but let me tell you my person experience with being a good listener. I will have to say, that I have not always been the best listener; however, I surely could talk your ear off. It was my first year in college, rooming with my best friend, and the world could not be any better. Until I stopped talking and really, truly, started to listen...',
        hidden: true,
        userId: 1,
        noteBookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'I call BETRAYAL!',
        note: 'Have you ever asked, will a true friend really be there for you? Well, I am about to give some real advice, from a real heartbreaking experience.',
        hidden: false,
        userId: 1,
        noteBookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: `How to handle an unruly boss`,
        note: `My boss is such a tyrant! However, why is she being so demanding at work? I am wanting to express my opinion on how to handle when your boss starts becoming a dictator, due to workflow stressors. This is my experience, and I am out here trying to help everyone keep their checks flowing! `,
        hidden: true,
        userId: 2,
        noteBookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: `Kappa Alpha PASS-A Semester!`,
        note: `Man, moving away from home is for the bird. I am not into migrating anywhere from the comfort of my mothers home cooked meals and my father's lame jokes. My freshman year was the worst of the worst, but I survived. I would like to share of the most important details that helped me stay thriving in a school atmosphere. Let's get wasted... on some knowledge! (Yeah! That was corny, but worth it right)`,
        hidden: false,
        userId: 2,
        noteBookId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: `I FAILED SPANISH, HOT DARN`,
        note: `Everyone knows that learning a new language can be truly the most difficult. But what if I told you, that you have been lying to yourself. Languages are not THAT hard to learn, I am going to tell you how I went from incompetent to fluent in a matter of 2 semesters. Come here me out, I have a lot if tips and tricks for becoming international! `,
        hidden: false,
        userId: 1,
        noteBookId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
