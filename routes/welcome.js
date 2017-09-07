const express = require("express")
const router = express.Router()
const NewRobots = require("../models/Users")
const users = require("../models/Robot")
const bcrypt = require("bcryptjs")

router.get("/sign-in", function(req, res) {
  res.render("welcome")
})

router.post("/sign-in", function(req, res) {
  const username = req.body.username
  const password = req.body.password
  NewRobots.findOne({ username: username }).then(function(user) {
    if (!user) {
      res.render("welcome")
      message: "Try Again!"
    } else {
      if (bcrypt.compareSync(password, user.passwordHash)) {
        req.session.user = user
        res.redirect("/")
      } else {
        res.render("welcome")
        message: "Try Again!"
      }
    }
  })
})

module.exports = router
