import { getDB } from "./config.js";

export const createUser = async (
  username,
  email,
  mobileno,
  password,
  createdAt,
  updatedAt
) => {
  const user = {
    username: username,
    email: email,
    mobileno: mobileno,
    password: password,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };
  const db = getDB();
  const result = await db.collection("users").insertOne(user);
  console.log("Result:", result);
};

export const findbyUsername = async (email) => {
  const db = getDB();
  const result = await db.collection("users").findOne({ email: email });
  return result;
  console.log("Result::", result);
};
