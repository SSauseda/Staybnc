'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 2,
        spotId: 1, 
        review: 'Great place, lots of room',
        stars: 4
      },
      {
        userId: 3,
        spotId: 2, 
        review: 'Great location to see everything',
        stars: 4
      },
      {
        userId: 1,
        spotId: 3, 
        review: 'Not exactly as advertised',
        stars: 2
      },
      {
        userId: 1,
        spotId: 4, 
        review: 'Great experience, Great Host!',
        stars: 5
      },
      {
        userId: 2,
        spotId: 5, 
        review: 'Difficult check-in but overall a great place to stay!',
        stars: 3
      },
      {
        userId: 3,
        spotId: 6, 
        review: 'Definitely will be coming back!',
        stars: 5
      },
      {
        userId: 2,
        spotId: 7, 
        review: 'Kind of noisy but home was wonderful!',
        stars: 4
      },
      {
        userId: 1,
        spotId: 8, 
        review: 'Loved it!',
        stars: 5
      },
      {
        userId: 1,
        spotId: 9, 
        review: 'The place is very clean and very spacious',
        stars: 5
      },
      {
        userId: 3,
        spotId: 10, 
        review: 'Very beautiful modern home. Cannot wait to book again soon!',
        stars: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
