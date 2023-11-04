'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Lessons';
    return queryInterface.bulkInsert(options, [
      {
        lessonId: 1,
        unlocked: true,
        userId: 1,

      },
      {
        lessonId: 2,
        unlocked: true,
        userId: 1,
      },
      {
        lessonId: 3,
        unlocked: false,
        userId: 1,
      },
      {
        lessonId: 4,
        unlocked: false,
        userId: 1,
      },
      {
        lessonId: 5,
        unlocked: false,
        userId: 1,
      },
      {
        lessonId: 6,
        unlocked: false,
        userId: 1,
      },
      {
        lessonId: 1,
        unlocked: true,
        userId: 2,
      },
      {
        lessonId: 2,
        unlocked: false,
        userId: 2,
      },
      {
        lessonId: 3,
        unlocked: false,
        userId: 2,
      },
      {
        lessonId: 4,
        unlocked: false,
        userId: 2,
      },
      {
        lessonId: 5,
        unlocked: false,
        userId: 2,
      },
      {
        lessonId: 6,
        unlocked: false,
        userId: 2,
      },
      {
        lessonId: 1,
        unlocked: true,
        userId: 3,
      },
      {
        lessonId: 2,
        unlocked: true,
        userId: 3,
      },
      {
        lessonId: 3,
        unlocked: true,
        userId: 3,
      },
      {
        lessonId: 4,
        unlocked: true,
        userId: 3,
      },
      {
        lessonId: 5,
        unlocked: false,
        userId: 3,
      },
      {
        lessonId: 6,
        unlocked: false,
        userId: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Lessons';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {[Op.in] : [1, 2, 3]}
    }, {});
  }
};
