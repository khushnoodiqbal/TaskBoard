require("dotenv").config();
const { verify } = require("jsonwebtoken");
const responseHandler = require("./responseHandler");

module.exports = (req, res, next) => {
  try {
    const { auth } = req.cookies;
    if (auth == undefined) {
      return responseHandler(res, { error: "Unauthorized User" });
    }

    verify(auth, process.env.SECRET, (error, data) => {
      if (error) {
        return responseHandler(res, { error: "ForBidden Access" });
      }
      next();
    });
  } catch (error) {
    return res.send({
      status: 400,
      data: {},
      error: error,
    });
  }
};
