const responseHandler = require("../responseHandler");
const { getUser } = require("../database/models/userModal");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body;
      const isExist = await getUser({ email, userId: false });

      if (isExist.error || !isExist.data) {
        res.cookie("auth", undefined, { maxAge: 30000, httpOnly: true });
        return responseHandler(res, {
          error: isExist.error || "User not found",
        });
      }
      const isValid = await compare(password, isExist.data.dataValues.password);
      if (!isValid) {
        res.cookie("auth", undefined, { maxAge: 30000, httpOnly: true });
        return responseHandler(res, { error: "Invalid Credentials" });
      }
      delete isExist.data.dataValues.password;
      const token = sign(isExist.data.dataValues, process.env.SECRET, {
        expiresIn: 30000,
      });

      res.cookie("auth", token, { maxAge: 30000, httpOnly: true });

      return responseHandler(res, { data: token });
    } catch (error) {
      return responseHandler(res, { error: error });
    }
  },
};
