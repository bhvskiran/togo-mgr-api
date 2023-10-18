const express = require("express");
const router = express.Router();
const admin = require("../firebase");
const User = require("../model/user");

router.post("/getUser", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const accesssToken = authorization.split(" ")[1];
    const decodeUser = await admin.auth().verifyIdToken(accesssToken);
    const email = req?.user_email;
    let user = await User.findOne({ email_id: email });
    if (user) {
      return res.send({ user });
    }
    user = await User.create({
      name: decodeUser?.name,
      email_id: decodeUser?.email,
      profile_pic: decodeUser?.picture,
    });
    return res.send({ user });
  } catch (error) {
    return res.json({
      message: "internal Error",
    });
  }
});

module.exports = router;
