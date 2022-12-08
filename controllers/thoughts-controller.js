const {thought, user} = require('../models');

module.exports = {
    getThoughts(req, res) {
        thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thoughts) => 
        !thoughts
        ? res.status(404).json({message: 'No thoughts found with ID'})
        : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        thought.create(req.body)
        .then((thoughtData) => {
            console.log(thoughtData)
          return user.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: {thoughts: thoughtData._id}},
            {new: true})
            
        }).then((userData) => {
            res.json("thought added")
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    deleteThought(req, res) {
        thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thoughts) => {
        console.log(thoughts)
        !thoughts
        ? res.status(404).json({message: 'No thought found with ID'})
        : user.findByIdAndUpdate(
            {username: thoughts.username},
            {$pull: {thoughts: {_id: thoughts._id}}})
         } )
        .then(() => res.json({message: 'Thought deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        thought.findOneAndUpdate(
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
        thought.findOneAndUpdate(
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
        thought.findOneAndUpdate(
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