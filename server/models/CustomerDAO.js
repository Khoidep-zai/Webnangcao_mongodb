require('../utils/MongooseUtil');
const Models = require('./Models');

const CustomerDAO = {
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password, active: 1 };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  async selectByUsername(username) {
    const query = { username: username };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  async insert(username, password, name, phone, email) {
    const mongoose = require('mongoose');
    const customer = new Models.Customer({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      password: password,
      name: name,
      phone: phone,
      email: email,
      active: 1,
      token: ''
    });
    await customer.save();
    return customer;
  }
};

module.exports = CustomerDAO;
