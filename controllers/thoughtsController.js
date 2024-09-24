const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('users');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No course with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

   async createThoughtAndLinkUser(req, res) {
    const { userId, thoughtContent } = req.body;
    try {
      const thought = await Thought.create({ thought: thoughtContent });
      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
      await Thought.findByIdAndUpdate(thought._id, { $push: { users: userId } });
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getUserThoughts(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user.thoughts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

 
  
};
