const mongoose = require("mongoose")
//do the stuff

//define the schema
const newRobotSchema = new mongoose.Schema({
  id: Number,
  name: String,
  // username: String,
  // password: String,
  avatar: String,
  email: String,
  phonenumber: String,
  university: String,
  company: String,
  jobs: String,
  skills: String
})
//create a model using that schema
const users = mongoose.model("users", newRobotSchema)

//export
module.exports = users
