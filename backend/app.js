require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGOOSE_URL = process.env.MONGO_URL;
var cors = require("cors");
const authRouter = require("./routes/authRouter.js");
const contactRouter = require("./routes/contactRouter.js");
const { ensureAuthenticated } = require("./middleware/auth.js");
const path = require("path");

const port = process.env.PORT 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function main() {
  await mongoose.connect(MONGOOSE_URL);
}
main()
  .then(() => {
    console.log("Connect to Db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", authRouter);
app.use("/", ensureAuthenticated, contactRouter);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(port, () => {
  console.log("server running");
});
