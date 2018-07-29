

/**
 * 数据库链接server
 */
const mongoose = require('mongoose');
const config = require('../conf/db-conf');

mongoose.connect("mongodb://" + config.HOST + ":" + config.PORT + "/" + config.NAME);
var db = mongoose.connection;
db.on('error', (err) => {
  console.error('未能正确连接mongodb')
});

module.exports = db;
