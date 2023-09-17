const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  getUserAndUpdate,
  deleteUser,
  addNewFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router
  .route("/:userId")
  .get(getSingleUser)
  .put(getUserAndUpdate)
  .delete(deleteUser);

router
  .route("/:userId/friends/:friendId")
  .post(addNewFriend)
  .delete(removeFriend);

module.exports = router;
