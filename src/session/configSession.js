const MongoStore = require( "connect-mongo");
const session = require( "express-session");
const dbConfig = require('../config.js');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
module.exports = session({
    store: MongoStore.create({
      mongoUrl: dbConfig.url,
      mongoOptions,
      ttl:600, //time to live sec session CHANGE TO =>10MIN 10*60
      autoRemove: 'native' //session expires the doc in mongodb will be removed
    }),
    secret: dbConfig.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Re initialization of the time in every request
    cookie: {
      maxAge: 300000, //CHANGE TO 5 MIN=> 1*1000*60
    },
  })