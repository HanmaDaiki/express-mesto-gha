const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.getUserById = (req, res) => {
  const id = req.params.userId;

  User.find({ _id: id })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.updateOne({ _id: userId }, { name, about })
    .then((user) => res.status(200).send({ data: user }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.updateOne({ _id: userId }, { avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((error) => res.status(500).send({ message: error.message }));
};
