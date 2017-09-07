const express = require("express")
const router = express.Router()
const users = require("../models/Robot")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")

const requireAuth = function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect("/sign-in")
  }
}

router.get("/signOut", function(req, res) {
  res.redirect("/sign-in")
})

router.get("/", requireAuth, function(req, res) {
  users.find().then(function(users) {
    res.render("index", {
      users: users
    })
  })
})

router.get("/NewRobot", function(req, res) {
  res.render("NewRobot")
})

router.post("/NewRobot", function(req, res) {
  const name = req.body.name
  const userName = req.body.userName
  const password = req.body.password
  const avatar = req.body.avatar
  const email = req.body.email
  const phonenumber = req.body.phonenumber
  const university = req.body.university
  const company = req.body.company
  const jobs = req.body.jobs
  const skills = req.body.skills

  const user = new users()

  user.username = userName
  user.password = password
  user.name = name
  user.avatar = avatar
  user.skills = skills
  user.university = university
  user.jobs = jobs
  user.company = company
  user.phonenumber = phonenumber
  user.email = email
  user
    .save()
    .then(function(user) {
      res.redirect("/")
    })
    .catch(function(error) {
      res.render("newRobot", {
        user: user,
        errors: error.errors
      })
    })
})

router.post("/users/:id", requireAuth, function(req, res) {
  users.findOne({ _id: req.params.id }).then(function(user) {
    const name = req.body.name
    const email = req.body.name
    const avatar = req.body.avatar
    const phone = req.body.phone
    const university = req.body.university
    const company = req.body.company
    const job = req.body.job
    const skills = req.body.skills

    user.name = name
    user.avatar = avatar
    user.email = email
    user.phone = phone
    user.university = university
    user.company = company
    user.job = job
    user.skills = skills
    user
      .save()
      .then(function(user) {
        res.redirect("/")
      })
      .catch(function(error) {
        res.render("edit", {
          user: user,
          errors: error.errors
        })
      })
  })
})

router.get("/users/:id/edit", requireAuth, function(req, res) {
  users.findOne({ _id: req.params.id }).then(function(user) {
    res.render("edit", {
      user: user
    })
  })
})

router.get("/users/:id", requireAuth, function(req, res) {
  users.findOne({ _id: req.params.id }).then(function(user) {
    res.render("profile", {
      user: user
    })
  })
})

router.get("/users/:id/delete", requireAuth, function(req, res) {
  users.deleteOne({ _id: req.params.id }).then(function(user) {
    res.redirect("/")
  })
})

module.exports = router
