const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
//const emailService = require("../services/email.services")
async function userRegisterController(req, res) {
    const { email, password, name } = req.body
    
    const isExist = await userModel.findOne({
        email:email
    })

    if (isExist) {
        return res.status(422).json({
            message: "User Already exists with email.",
            status:"failed"
        })
    }

    const user = await userModel.create({
        email,password,name
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
    
    res.cookie("token", token)
    
    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

//    await emailService.sendRegistrationEmail(user.email,user.name)
}

async function userLoginController(req, res) {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        })
    }

    const user = await userModel
        .findOne({ email })
        .select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}






module.exports = {
    userRegisterController, userLoginController
}