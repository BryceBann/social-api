const { json } = require("express");
const { user, thought } = require("../models");
 
module.exports = {
    getUser(req, res) {
        user.find()
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        user.findOne({_id: req.params.userId})
        .populate("thoughts")
        .then((userData) => 
        !userData
        ? res.status(404).json({message: 'No user found with ID'})
        : res.json(userData)
        )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        user.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        user.findOneAndDelete({_id: req.params.userId})
        .then((userData) => 
        !userData
        ? res.status(404).json({message: 'No user found with ID'})
        : thought.deleteMany({_id: {$in: userData.thoughts} })
        )
        .then(() => res.json({message: 'User and thought deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        user.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
        )
        .then((userData) => 
        !userData
        ? res.status(404).json({message: 'No user found with ID'})
        : res.json(userData)
        )
        .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
        user.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        )
        .then((userData) => 
        !userData
        ? res.status(404).json({message: 'No friend with ID'})
        : res.json(userData)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        user.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then((userData) => 
        !userData
        ? res.status(404).json({message: 'No friend with ID'})
        : res.json(userData)
        )
        .catch((err) => res.status(500).json(err));
    },
};