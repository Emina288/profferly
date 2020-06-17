require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => res.send("Hello World"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/src", "index.js"));
});

app.use("/", express.static(path.join(__dirname, "/frontend/src")));


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


app.use(passport.initialize());
require("./config/passport")(passport);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/posts", posts)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


