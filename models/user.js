const { Schema, model } = require('mongoose');
const commentSchema = require('./comments');
const thoughtSchema = require('./thoughts')
const { isEmail }  = require('validator');

const userSchema = new Schema(
  {
    id: {
      type: Number, 
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trimmed: true,
      unique: true,
      maxLength: 50, 
    },
    email: {
      type: String,
      required: true,
      maxLength: 50, 
      unique: true,
      validate: [ isEmail, 'invalid email' ]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', 
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
