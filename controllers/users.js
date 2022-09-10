const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'ERROR :: Упс, у нас тут непредвиденная ошибка! Status(500)' }));
};

module.exports.getUserById = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'ERROR :: Получение пользователя с несуществующим в БД id! Status(404)' });
      }
      return res.send({ data: { user } });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'ERROR :: Получение пользователя с некорректным id! Status(400)' });
      }
      return res.status(500).send({ message: 'ERROR :: Упс, у нас тут непредвиденная ошибка! Status(500)' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'ERROR :: Введены некорректные данные для создания пользователя! Status(400)' });
      }
      return res.status(500).send({ message: 'ERROR :: Упс, у нас тут непредвиденная ошибка! Status(500)' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { name, about }, { returnDocument: 'after', new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'ERROR :: Введены некорректные данные для обновления данных пользователя! Status(400)' });
      }
      if (error.name === 'CastError') {
        return res.status(404).send({ message: 'ERROR :: Пользователь не найден! Status(404)' });
      }
      return res.status(500).send({ message: 'ERROR :: Упс, у нас тут непредвиденная ошибка! Status(500)' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate({ _id: userId }, { avatar }, { returnDocument: 'after', new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'ERROR :: Введены некорректные данные для обновления данных пользователя! Status(400)' });
      }
      if (error.name === 'CastError') {
        return res.status(404).send({ message: 'ERROR :: Пользователь не найден! Status(404)' });
      }
      return res.status(500).send({ message: 'ERROR :: Упс, у нас тут непредвиденная ошибка! Status(500)' });
    });
};
