const { Thoughts, User } = require('../models');

module.exports = {
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
        res.json({
          user
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
        res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
        if (!user) {
          res.status(404).json({ message: 'No user with this id!' });
        }
        return res.json(user);
      } catch (err) {
        return res.status(500).json(err);
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

   async addFriend(req, res) {
    const { userId, friendId } = req.params; 
    try {
      await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } });
      await User.findByIdAndUpdate(friendId, { $addToSet: { friends: userId } });
      res.status(200).json({ message: 'Friend added successfully!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async removeFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
      await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });
      res.status(200).json({ message: 'Friend removed successfully!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};