class UserDTO {
  _id;
  phone;
  name;
  photo;
  activated;
  createdAt;

  constructor(user) {
    this._id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.photo = user.photo;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDTO;
