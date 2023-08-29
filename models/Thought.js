const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, "Thought must have at least 1 character"],
      maxLength: [280, "Max 280 characters reached"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return date.toISOString().split("T")[0];
      },
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
