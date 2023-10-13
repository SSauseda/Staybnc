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
        address: '123 Test Street',
        city: 'Dallas',
        state: 'Texas',
        country: 'USA',
        lat: 32.7767,
        lng: 96.7970,
        name: 'Texas Living',
        description: 'Roomy home for a great weekend. This place features multiple large rooms, all with queen beds, a comfortable sofa, table and chair for everyone to enjoy',
        price: 250
      },
      {
        ownerId: 2,
        address: '2202 Madison Street',
        city: 'Chicago',
        state: 'Illinois',
        country: 'USA',
        lat: 41.8781,
        lng: 87.6298,
        name: 'City Vibes',
        description: 'Nestled in the bustling heart of Chicago, this property offers a unique blend of city life and cozy comfort. Step out and explore the vibrant streets or relax and soak in the urban vibes from the comfort of your room.',
        price: 400
      },
      {
        ownerId: 3,
        address: '999 Beach Ave.',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Highrise beachfront',
        description: 'Elevate your vacation with this luxury beachfront residence in Miami. Wake up to the soothing sounds of waves and enjoy panoramic ocean views as you sip your morning coffee.',
        price: 500
      },
      {
        ownerId: 2,
        address: '1274 Byrd Lane',
        city: 'Santa Fe',
        state: 'New Mexico',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Mountain View Tiny Home',
        description: 'Reconnect with the beautiful nature. You are minutes away from enjoying the great outdoor activies this place has to offer.',
        price: 250
      },
      {
        ownerId: 3,
        address: '760 Gordon Street',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'A-Frame Cabin',
        description: 'Enjoy the great designed cabin surrounded by evergreens and nestled behind a charming seasonal creek',
        price: 400
      },
      {
        ownerId: 1,
        address: '760 Gordon Street',
        city: 'Fredericksburg',
        state: 'Texas',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Peach Log Cabin',
        description: 'Peach Log Cabin offers two spacious bedrooms and an antique copper soaking tub. Relax in this great retreat, only five miles from Downtown with access to great restaurants and shopping.',
        price: 300
      },
      {
        ownerId: 1,
        address: '469 Carolina Ave.',
        city: 'Denver',
        state: 'Colorado',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Dream Ridge',
        description: 'Dream Ridge is the ideal escape to enjoy your next Telluride vacation. With over 10 bedrooms, everyone has a space to enjoy with the many features and amenities included.',
        price: 500
      },
      {
        ownerId: 3,
        address: '998 Crowfield Road',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Modern Ranch Cabin',
        description: 'Surrounded by large mountain views, Modern Ranch Cabin offers a large screened porch to enjoy the incredible mountain views. ',
        price: 500
      },
      {
        ownerId: 3,
        address: '122 Late Ave.',
        city: 'Oklahoma City',
        state: 'Oklahoma',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Greenwood Cottage',
        description: 'Find your oasis at the Greenwood Cottage in Oklahoma City. This bright and colorful cabin, nestled among towering pines, offers a serene retreat from the hustle and bustle of daily life.',
        price: 500
      },
      {
        ownerId: 2,
        address: '448 Union Street',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Charming Outdoor Cabin',
        description: 'This charming cabin offers a rustic-yet-modern interior, year-round adventures, and access to 3 lake beaches for fishing, picknicking, swimming, tennis, and more!',
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
