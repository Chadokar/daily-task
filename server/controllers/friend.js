const db = require("../db");

const friendRequest = async (req, res) => {
  try {
    const user = req.user.username;
    const friend = req.body.friend;
    // Check if the friend request already exists
    const existingRequest = await db("friends")
      .where({ user, friend })
      .orWhere({ user: friend, friend: user })
      .first();

    if (existingRequest) {
      throw new Error("Friend request already exists.");
    }

    // Insert the new friend request
    await db("friends").insert({
      user,
      friend,
      created_at: new Date(),
      updated_at: new Date(),
      accepted: false,
    });

    res.status(201).json({ message: "Friend request sent.", success: true });
  } catch (error) {
    if (
      error.message ===
      'insert into "friends" ("accepted", "created_at", "friend", "updated_at", "user") values ($1, $2, $3, $4, $5) - insert or update on table "friends" violates foreign key constraint "friends_friend_foreign"'
    ) {
      return res.status(401).json({ error: "User not found.", success: false });
    }
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const user = req.user.username;
    const friend = req.body.friend;
    // Update the friend request to be accepted
    await db("friends")
      .where({ user: friend, friend: user, accepted: false })
      .update({ accepted: true, updated_at: new Date() });

    res
      .status(200)
      .json({ message: "Friend request accepted.", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

const getFriends = async (req, res) => {
  try {
    const user = req.user.username;
    // Get all friends
    const friends = await db("friends")
      .where({ user, accepted: true })
      .orWhere({ friend: user, accepted: true });

    res.status(200).json({ friends, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

// get all friend requests
const getFriendRequests = async (req, res) => {
  try {
    const user = req.user.username;
    // Get all friend requests
    const friends = await db("friends")
      .where({ friend: user, accepted: false })
      .select("user");

    res.status(200).json({ friends, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

// get all friend requests sent
const getFriendRequestsSent = async (req, res) => {
  try {
    const user = req.user.username;
    // Get all friend requests
    const friends = await db("friends")
      .where({ user, accepted: false })
      .select("friend");

    res.status(200).json({ friends, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const user = req.user.username;
    const friend = req.params.friend;
    // Remove the friend
    await db("friends")
      .where({ user, friend })
      .orWhere({ user: friend, friend: user })
      .delete();

    res.status(200).json({ message: "Friend removed.", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

module.exports = {
  friendRequest,
  acceptFriendRequest,
  getFriends,
  deleteFriend,
  getFriendRequests,
  getFriendRequestsSent,
};
