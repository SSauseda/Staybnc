'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1516315138947-26e8f277dbe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1599243272864-e9dd455966bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1593853761096-d0423b545cf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1521783593447-5702b9bfd267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1620061368427-2ac59d60385d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1565053805884-2766c2fda174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1610527003928-47afd5f470c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50636326/original/0d90132a-5ba2-4976-a3a0-9e2c14b76e90.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/fa985dfc-fec1-47b0-8c68-0a501d629a62.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/a905b388-7a64-4697-a31f-ccbd2ce53969.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/ae5b1c41-7806-46ae-b6c6-4e01e4d5e4f0.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/d639d673-e47d-41a9-9320-3a6a62b43997.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/003f4a49-1a57-4b60-8a85-53ef7b331a4f.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/a016e661-65fb-4fc3-90d3-8631bf239ac6.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/94edbf9e-8f5b-4122-9780-4d560ad89259.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/dd54f8e2-e983-4cf2-a653-6a88728fc43c.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/0123ad58-2bce-478a-9f71-954266c97dd4.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/85fb752b-1002-4383-80d8-0c3eb018616a.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/026631af-0159-4ae3-98c8-47147d020f90.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/95082aa9-369b-4b7f-a49e-f321266cad39.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/a27b3a3d-29e9-4050-8cb4-55f606e08666.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/cc7abf89-5616-4aeb-980d-a84321c321bc.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/d3f7cff9-f094-4188-907e-d333ff3ee2e1.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/987a6f64-9d62-44fb-801f-36d1c55fbb71.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/9a4130fa-873a-4b69-aa3d-a5e1e9501987.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/8688b792-c30a-49b6-8dda-322431a499f6.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/791a4cde-cfc3-4fa8-8d8b-172869e1624d.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/ae909a67-8752-4729-9aaf-d3ff7c6d9fd3.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36106466/original/82ccae61-23c4-47ca-a49f-9eb5fa79d0d8.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36106466/original/a4dd75a7-ae47-4429-8fae-edbb2686e66a.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36106466/original/161712e3-2ffe-47d9-9f25-01e60e988535.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36106466/original/5bf31cb4-9384-4e23-bc47-c62013011230.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-877593302449615860/original/abe1e9c8-afcd-49f4-8dcc-f5d0405abb84.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-877593302449615860/original/10194fcc-5121-47ef-a31d-d32573af3615.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-877593302449615860/original/50a07f4a-cc82-42d8-9b67-47e2e705c7fb.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-877593302449615860/original/68c927d5-d2c1-408e-a477-9a7151d2d9fa.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-877593302449615860/original/77162cab-bbee-437c-9728-57eb712d1e65.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-845647923208766008/original/0061ef5c-6ad9-402f-ada1-072e11f8a7e7.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-845647923208766008/original/85650cb3-9e27-4236-b2ec-467084e1953e.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-845647923208766008/original/98df96d8-a1b7-4234-b613-f5cba68aedb6.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-845647923208766008/original/a765d757-bedd-4a4b-acbc-3af94ad42abb.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-845647923208766008/original/58d0c861-f849-4664-ab57-fe44d6c2d3c8.jpeg?im_w=720',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
