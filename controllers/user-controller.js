const { json } = require("express");
const { user, thoughts } = require("../models");
 
module.exports = {
    getUser(req, res) {
        user.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        user.findOne({_id: req.params.userId})
        .populate('user')
        .populate('friends')
        .select('-__V')
        .then((user) => 
        !user
        ?res.status(404).json({message: 'No user found with ID'})
        :res,json(err)
        )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        user.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        user.findOneAndDelete({_id: req.params.userId})
        .then((user) => 
        !user
        ? res.status(404).json({message: 'No user found with ID'})
        : user.deleteMany({_id: {$in: user.thought} })
        )
        .then(() => res.json({message: 'User and thought deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(rea, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res.status(404).json({message: 'No user found with ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
        user.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        )
        .then((user) => 
        !user
        ?res.status(404).json({message: 'No friend with ID'})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        user.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then((user) => 
        !user
        ?res.status(404).json({message: 'No friend with ID'})
        :res.json(user)
        )
        .catch((err) => res,status(500).json(err));
    },
};