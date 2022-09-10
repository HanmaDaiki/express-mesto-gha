const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'ERROR :: Упс, у нас тут непредвиденная ошибка! Status(500)' }));
};

module.exports.createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'ERROR :: Переданы некорректные данные в методы создания карточки! Status(400)' });
      }
      return res.status(500).send({ message: 'ERROR :: Упс, у нас тут непредвиденная ошибка! Status(500)' });
    });
};

module.exports.deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndDelete(id)
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'ERROR :: Удаление карточки с несуществующим в БД id! Status(404)' });
      }
      return res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'ERROR :: Удаление карточки с некорректным id! Status(400)' });
      }
      return res.status(500).send({ message: 'ERROR :: Упс, у нас тут непредвиденная ошибка! Status(500)' });
    });
};

module.exports.likeCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.dislikeCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    { _id: id },
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => res.status(500).send({ message: error.message }));
};
