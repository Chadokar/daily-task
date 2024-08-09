const express = require("express");
const { body, header } = require("express-validator");
const { validate } = require("../services/validator");
const { verify } = require("../middlewares/verify");
const {
  friendRequest,
  acceptFriendRequest,
  getFriends,
  deleteFriend,
  getFriendRequests,
  getFriendRequestsSent,
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
  "/accept",
  [
    header("Authorization", "Authorization token is required").exists(),
    body("friend", "Friend username is required").exists(),
  ],
  validate,
  verify,
  acceptFriendRequest
);

router.get(
  "/list",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getFriends
);

router.get(
  "/requests",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getFriendRequests
);

router.get(
  "/sent-requests",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getFriendRequestsSent
);

router.delete(
  "/delete/:friend",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  deleteFriend
);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Friend route" });
});

module.exports = router;
