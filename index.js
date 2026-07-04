import express from "express";
import envConfig from "./configs/envConfig.js";
import db from "./configs/db.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute.js";

const port = envConfig.PORT;

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/api/user", userRouter);

app.listen(port, (err) => {
  if (!err) {
    console.log("SERVER STARTED...");
    console.log(`http://localhost:${port}`);
  } else {
    console.log(err.message);
  }
});
