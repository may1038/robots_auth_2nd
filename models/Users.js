const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true }
})

const NewRobots = mongoose.model("NewRobots", userSchema)

module.exports = NewRobots
