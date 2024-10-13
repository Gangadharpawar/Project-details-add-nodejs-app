import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db/mongo/config.js";
import { registerUser, Login } from "./Authontication.js";
import { veriFyToken } from "./Middelware.js";
import {
  createproject,
  getproject,
  Updatestatus,
  getprojectcount,
  getdepartmentwisecount,
} from "./project.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = 5500;

app.post("/register", registerUser);
app.post("/login", Login);

// app.use(veriFyToken);
app.post("/projects", createproject);
app.get("/projects", getproject);
app.get("/projects/counts", getprojectcount);
app.get("/projects/departmentcount", getdepartmentwisecount);
app.patch(`/projects/:id`, Updatestatus);

const promiseobj = connectDB();
promiseobj
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Started on Port Number: ${port}`);
    });
  })
  .catch((error) => {
    console.log("faild to connect MongoDB", error);
  });
