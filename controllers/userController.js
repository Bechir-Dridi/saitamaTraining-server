const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({ tokenId: id }, process.env.SECRET, { expiresIn: "3d" })
}

//login user
const loginUser = async (req, res) => {
    //1.grab the email and password from the request body
    const { email, password } = req.body

    //2.try logina
    try {
        const user = await User.logina(email, password)

        const token = createToken(user._id)
        res.status(200).json({ msg: "login user was a success", email, token })
        //res.json({ msg: "login user was a success" })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}


//signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signupa(email, password)

        const token = createToken(user._id)
        res.status(200).json({ email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }