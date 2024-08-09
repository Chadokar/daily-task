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
      return "Friend request already exists or they are already friends.";
    }

    // Insert the new friend request
    await knex("friends").insert({
      user,
      friend,
      created_at: new Date(),
      updated_at: new Date(),
      accepted: false,
    });

    res.status(201).json({ message: "Friend request sent.", success: true });
  } catch (error) {
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

const deleteFriend = async (req, res) => {
  try {
    const user = req.user.username;
    const friend = req.body.friend;
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
};
