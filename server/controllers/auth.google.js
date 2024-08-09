const { google } = require("googleapis");

const db = require("../db");
const { generateHash } = require("../services/misc-services");

const client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// Oauth2 URL generator
const redirectedUrl = async (req, res) => {
  try {
    const authorizationUrl = client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.force-ssl",
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtubepartner",
        "https://www.googleapis.com/auth/youtubepartner-channel-audit",
      ],
      include_granted_scopes: true,
    });
    res.redirect(authorizationUrl);
  } catch (error) {
    if (error.code < 400) res.status(500);
    res.send({ error: error.message });
  }
};

// Oauth2 code decoder
const decoder = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      res.status(400).send({ error: "Authorization code not provided" });
      return;
    }

    // Use the OAuth2Client instance to get the token
    const { tokens } = await client.getToken(code);
    // console.log("token : ", tokens);

    // user details
    const user = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // // console.log("User: ", user);

    // Set the credentials for the OAuth2 client
    client.setCredentials(tokens);

    // Create a YouTube service instance
    const youtube = google.youtube({ version: "v3", auth: client });

    // // Fetch user's profile information to get the email
    // const oauth2 = google.oauth2({ version: "v2", auth: client });
    // const profile = await oauth2.userinfo.get();

    // Fetch user's YouTube account details
    const response = await youtube.channels.list({
      part: "snippet,contentDetails,statistics",
      mine: true,
    });
    // // const youtubeResponse = await fetch(
    // //     "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true",
    // //     {
    // //       headers: {
    // //         Authorization: `Bearer ${tokens.access_token}`,
    // //       },
    // //     }
    // //   ).then((res) => res.json());

    if (!response.data.items.length) {
      res.status(400);
      throw new Error("No YouTube account found");
    }

    // generate one time password
    const otp = Math.floor(100000 + Math.random() * 900000);

    // hashing OTP
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await generateHash(otp, salt);

    const getUser = await db("users")
      .insert({
        email: user.payload.email,
        first_name: user.payload.given_name,
        last_name: user.payload.family_name,
        profile_id: user.payload.sub,
        password: hashedOtp,
        yt_channel: response.data.items[0].id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      })
      .returning(["id", "email", "first_name", "last_name", "profile_id"])
      .then((res) => res[0]);

    if (!getUser) {
      res.status(400);
      throw new Error("User not found. Please register first.");
    }
    const { id } = getUser;

    // // Save the user's YouTube account details to the database

    await db("channels")
      .insert({
        title: response.data.items[0].snippet.title,
        description: response.data.items[0].snippet.description,
        url: response.data.items[0].snippet.customUrl,
        yt_channel_id: response.data.items[0].id,
        user_id: id,
      })
      .returning(["id", "title", "description", "url", "yt_channel_id"])
      .then((res) => res[0]);

    res.status(200).send({
      token: tokens,
      youtubeAccount: response.data,
      success: true,
      user: getUser,
      // profile: profile.data,
    });
  } catch (error) {
    console.error(error);

    if (error.code < 400) res.status(500);
    res.send({ error: error.message });
  }
};

// const decoder = async (req, res) => {
//   try {
//     const code = req.query.code;
//     if (!code) {
//       res.status(400).send({ error: "Authorization code not provided" });
//       return;
//     }

//     // Use the OAuth2Client instance to get the token
//     const { tokens } = await client.getToken(code);
//     // console.log("token : ", tokens);

//     // user details
//     const user = await client.verifyIdToken({
//       idToken: tokens.id_token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     // console.log("User: ", user);

//     // Set the credentials for the OAuth2 client
//     client.setCredentials(tokens);

//     // Create a YouTube service instance
//     const youtube = google.youtube({ version: "v3", auth: client });

//     // // Fetch user's profile information to get the email
//     // const oauth2 = google.oauth2({ version: "v2", auth: client });
//     // const profile = await oauth2.userinfo.get();

//     // Fetch user's YouTube account details
//     const response = await youtube.channels.list({
//       part: "snippet,contentDetails,statistics",
//       mine: true,
//     });
//     // const youtubeResponse = await fetch(
//     //     "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true",
//     //     {
//     //       headers: {
//     //         Authorization: `Bearer ${tokens.access_token}`,
//     //       },
//     //     }
//     //   ).then((res) => res.json());

//     if (!response.data.items.length) {
//       res.status(400);
//       throw new Error("No YouTube account found");
//     }

//     const { id } = await db("users")
//       .select("id")
//       .where({ email: user.payload.email })
//       .first();

//     // Save the user's YouTube account details to the database

//     const video = await db("channels")
//       .insert({
//         title: response.data.items[0].snippet.title,
//         description: response.data.items[0].snippet.description,
//         url: response.data.items[0].snippet.customUrl,
//         yt_channel_id: response.data.items[0].id,
//         user_id: id,
//       })
//       .returning(["id", "title", "description", "url", "yt_channel_id"])
//       .then((res) => res[0]);

//     await db("users").where({ id }).update({
//       yt_channel: video.id,
//       access_token: tokens.access_token,
//       profile_id: user.payload.sub,
//     });

//     res.status(200).send({
//       token: tokens,
//       youtubeAccount: response.data,
//       success: true,
//       user,
//       // profile: profile.data,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(error.code >= 400 ? error.code : 500)
//       .send({ error: error.message });
//   }
// };

module.exports = { redirectedUrl, decoder };
