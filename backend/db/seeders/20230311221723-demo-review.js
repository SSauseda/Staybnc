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
      {
        userId: 4,
        spotId: 1,
        review: 'The view from the balcony was breathtaking!',
        stars: 5
    },
    {
        userId: 5,
        spotId: 2,
        review: 'The amenities were top-notch. Felt like a 5-star hotel.',
        stars: 5
    },
    {
        userId: 4,
        spotId: 3,
        review: 'The neighborhood was a bit noisy in the evenings.',
        stars: 3
    },
    {
        userId: 5,
        spotId: 4,
        review: 'The interior decor is so tasteful and modern. Loved it!',
        stars: 5
    },
    {
        userId: 4,
        spotId: 5,
        review: 'The host was very responsive and helpful.',
        stars: 4
    },
    {
        userId: 6,
        spotId: 6,
        review: 'The bed was super comfy. Slept like a baby!',
        stars: 5
    },
    {
        userId: 6,
        spotId: 7,
        review: 'The WiFi was a bit spotty in the bedroom.',
        stars: 3
    },
    {
        userId: 5,
        spotId: 8,
        review: 'Loved the open kitchen layout. Great for family gatherings.',
        stars: 5
    },
    {
        userId: 6,
        spotId: 9,
        review: 'The backyard pool was the highlight of our trip!',
        stars: 5
    },
    {
        userId: 4,
        spotId: 10,
        review: 'The place was a bit smaller than expected, but very cozy.',
        stars: 4
    },
    {
        userId: 6,
        spotId: 1,
        review: 'The fireplace in the living room was a nice touch for the cold evenings.',
        stars: 5
    },
    {
        userId: 5,
        spotId: 2,
        review: 'The location is perfect, right in the heart of the city.',
        stars: 5
    },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {})
  }
};
