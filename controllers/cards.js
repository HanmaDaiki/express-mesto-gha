const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.deleteOne({ _id: id })
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((error) => res.status(500).send({ message: error.message }));
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
