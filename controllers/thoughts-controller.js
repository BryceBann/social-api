const {thoughts, user} = require('../models');

module.exports = {
    getThoughts(req, res) {
        thoughts.findAll()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        thoughts.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thoughts) => 
        !thoughts
        ? res.status(404).json({message: 'No thoughts found with ID'})
        : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        thoughts.create(req.body)
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    deleteThought(req, res) {
        thoughts.findOneAndDelete({_id: req.params.thoughtId})
        .then((thoughts) => 
        !thoughts
        ? res.status(404).json({message: 'No thought found with ID'})
        : user.deleteMany({_id: {$in: thoughts.users} })
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
        .then((thoughts) => 
        !thoughts
        ? res.status(404).json({message: 'No thought found with ID'})
        : res.json(thoughts)
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
        !thoughts
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
        !thoughts
        ? res.status(404).json({message: "No thought found with ID"})
        : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
};