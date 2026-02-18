const express = require("express")
const authController = require("../controllers/auth.controller")
const router = express.Router()


/** POST  */
router.post("/register",authController.userRegisterController)

router.post("/login", authController.userLoginController)


module.exports = router