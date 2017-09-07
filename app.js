const express = require("express")
const app = express()
const mustache = require("mustache-express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")
const mongooseSession = require("mongoose-session")
const MongoCLient = require("mongodb")

mongoose.Promise = require("bluebird")
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(bodyParser.urlencoded({ extended: false }))

const url = "mongodb://127.0.0.1:27017/robots"
mongoose.connect(url)

var sess = {
  secret: "keyboard cat",
  cookies: {},
  saveUninitialized: true,
  resave: true
  // store: mongooseSession(mongoose)
}

app.use(session(sess))

const users = require("./routes/users")
app.use(users)

const welcome = require("./routes/welcome")
app.use(welcome)

const register = require("./routes/register")
app.use(register)

app.listen(3000, function() {
  console.log("Express started on port 3000")
})
