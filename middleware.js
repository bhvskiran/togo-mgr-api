const admin = require("./firebase");

const middleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const accesssToken = authorization.split(" ")[1];
    const decodeUser = await admin.auth().verifyIdToken(accesssToken);

    if (decodeUser) {
      req["user_email"] = decodeUser?.email;
      return next();
    }
    return res.json({
      message: "Unauthorized",
    });
  } catch (error) {
    return res.json({
      message: "internal Error",
    });
  }
};

module.exports = middleware;
