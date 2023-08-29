const { ObjectId } = require("mongoose").Types;

const { json } = require("express");

const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params._id });

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that ID" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const newThought = await Thought.create(
        req.body
        //    {userName: req.body.userName},
        //    {thoughtText: req.body.thoughtText},
      );
      const userThought = await User.findOneAndUpdate(
        { userName: req.body.userName },

        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      res.json({ newThought, userThought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getThoughtAndUpdate(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        { $set: { thoughtText: req.body.thoughtText } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params._id,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that ID" });
      }
      res.json({ message: "Thought deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thoughtReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        //  { $push: { reactions: reactionId } },
        { runValidators: true, new: true }
      );

      res.json({ thoughtReaction });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thoughtReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.body } }
      );
      res.json({ message: "reaction removed!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
