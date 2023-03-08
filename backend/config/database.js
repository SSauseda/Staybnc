// require index.js module from same directory and assign it to 'config'
const config = require('./index');

// Export an object that defines the configuration for the 'developtment' and 'production' environments
module.exports = {
  development: {
    //Set the storage for sequelize to the dbFile property in the config object
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      // define the global schema for the project
      schema: process.env.SCHEMA
    }
  }
};
