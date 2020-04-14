const db = require('../../db');
module.exports = async (type) => {
  const Model = db[type + 'Model'];
  const count = await Model.find().countDocuments();
  return count;
};
