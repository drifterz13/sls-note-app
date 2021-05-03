"use strict";

module.exports.hello = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: `Hello world! 🍺🍺🍺 ${process.env.MONGODB_USERNAME}`,
  };

  callback(null, response);
};
