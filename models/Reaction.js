const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  reactionBody: {
    type: String,
    required: true,
    maxLength: [280, "Max 280 characters reached"],
  },

  username: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      return date.toISOString().split("T")[0];
    },
  },
});

module.exports = reactionSchema;
