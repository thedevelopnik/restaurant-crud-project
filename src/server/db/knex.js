var environment = 'production' || 'development';
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
