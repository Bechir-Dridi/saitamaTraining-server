//import express
const express = require("express")
//make instance of the express Router
const router = express.Router()

//import controller fcts
const { loginUser, signupUser } = require("./../controllers/userController")

//login router
router.post("/login", loginUser)
//signup router
router.post("/signup", signupUser)

module.exports = router;