'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Test st',
        city: 'Dallas',
        state: 'Texas',
        country: 'USA',
        lat: 32.7767,
        lng: 96.7970,
        name: 'Texas Living',
        description: 'Roomy home for a great weekend',
        price: 250
      },
      {
        ownerId: 1,
        address: '2202 Madison st',
        city: 'Chicago',
        state: 'Illinois',
        country: 'USA',
        lat: 41.8781,
        lng: 87.6298,
        name: 'City Vibes',
        description: 'Great location for downtown fun',
        price: 400
      },
      {
        ownerId: 1,
        address: '999 Beach ave',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Highrise beachfront',
        description: 'Luxury home with beach views',
        price: 500
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
