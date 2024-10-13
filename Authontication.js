import { createUser, findbyUsername } from "./db/mongo/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res, next) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.mobileno ||
      !req.body.password ||
      !req.body.createdAt ||
      !req.body.updatedAt
    ) {
      res.status(400).json({ message: "All Fild Are Required" });
      return;
    }
    var haspasswrod = bcrypt.hashSync(req.body.password, process.env.SALT);

    await createUser(
      req.body.username,
      req.body.email,
      req.body.mobileno,
      haspasswrod,
      req.body.createdAt,
      req.body.updatedAt
    );
    res.status(201).json({ message: "User Created " });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  // console.log(req.body);
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ message: "User Name And Password is required" });
      return;
    }
    //find user by email
    const user = await findbyUsername(req.body.email);
    //compare password
    const IsPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (IsPasswordMatch) {
      const Myuserid = { email: user.email };
      var token = jwt.sign(Myuserid, process.env.JWT_SECRET_TOKEN);
      res.status(200).json({ message: "Login Success", token: token });
      return token;
    }
    res.status(401).json({ message: "Invalid Credentials" });
  } catch (error) {
    next(error);
  }
};
