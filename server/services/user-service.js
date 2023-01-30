const UserModel = require("../models/UserModel");

class UserService {
  async findUser(filter) {
    const user = UserModel.findOne(filter);
    return user;
  }
  async createUser(data) {
    const user = UserModel.create(data);
    return user;
  }
}

module.exports = new UserService();
