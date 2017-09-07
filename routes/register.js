const express = require("express")
const router = express.Router()
const NewRobots = require("../models/Users")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")

router.get("/register", function(req, res) {
  res.render("register")
})

router.post("/register", function(req, res) {
  const username = req.body.username
  const password = req.body.password

  const user = new NewRobots()

  user.username = username
  user.passwordHash = bcrypt.hashSync(password, 8)
  user
    .save()
    .then(function(user) {
      req.session.users = user
      res.redirect("/")
    })
    .catch(function(error) {
      res.render("register", {
        user: user,
        error: error.errors
      })
    })
})

module.exports = router
