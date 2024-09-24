const { Schema, Types } = require('mongoose');

const commentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    commentBody: {
      type: String,
      maxlength: 280,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    thoughtsId: { 
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Thought',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = commentSchema;
