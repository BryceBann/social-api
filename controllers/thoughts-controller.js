const {thoughts, user, thought} = require('../models');

module.exports = {
    getThought(req, res) {
        thoughts.findAll()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        thoughts.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) => 
        !thought
        ? res.status(404).json({message: 'No thoughts found with ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        thoughts.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    deleteThought(req, res) {
        thoughts.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) => 
        !thought
        ? res.status(404).json({message: 'No thought found with ID'})
        : user.deleteMany({_id: {$in: thought.users} })
        )
        .then(() => res.json({message: 'Thought and user deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(rea, res) {
        thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({message: 'No thought found with ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteReaction(req, res) {
        thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((thoughts) => 
        !thought
        ?res.status(404).json({message: "No thought found with ID"})
        :res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
       
    },

    createReaction(req, res) {
        thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thoughts) => 
        !thought
        ? res.status(404).json({message: "No thought found with ID"})
        : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
};