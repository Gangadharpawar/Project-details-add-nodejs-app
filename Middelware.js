import jwt from "jsonwebtoken";

export const veriFyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Not Authonticated" });
    return;
  }
  //valid token
  //"Bearer <token>" ->  ["Bearer", "<token>"][1]

  const token = req.headers.authorization.split(" ")[1];
  try {
    var decodtokenvalue = jwt.verify(token.process.env.JWT_SECRET_TOKEN);
    console.log("token value", decodtokenvalue);
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};
