const router = require("express").Router();

const {
  getThoughts,
  createThought,
  getSingleThought,
  getThoughtAndUpdate,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:_id")
  .get(getSingleThought)
  .put(getThoughtAndUpdate)
  .delete(deleteThought);

router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
