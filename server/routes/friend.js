const express = require("express");
const { body, header } = require("express-validator");
const { validate } = require("../services/validator");
const { verify } = require("../middlewares/verify");
const {
  friendRequest,
  acceptFriendRequest,
  getFriends,
  deleteFriend,
} = require("../controllers/friend");

const router = express.Router();

router.post(
  "/request",
  [
    header("Authorization", "Authorization token is required").exists(),
    body("friend", "Friend username is required").exists(),
  ],
  validate,
  verify,
  friendRequest
);

router.post(
  "/accept-request",
  [
    header("Authorization", "Authorization token is required").exists(),
    body("friend", "Friend username is required").exists(),
  ],
  validate,
  verify,
  acceptFriendRequest
);

router.get(
  "/friends",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getFriends
);

router.delete(
  "/delete",
  [
    header("Authorization", "Authorization token is required").exists(),
    body("friend", "Friend username is required").exists(),
  ],
  validate,
  verify,
  deleteFriend
);

module.exports = router;
