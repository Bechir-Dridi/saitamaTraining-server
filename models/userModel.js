const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }

})
//static login method
userSchema.statics.logina = async function (email, password) {
    //1.check if the email & password exist
    if (!email & !password) {
        throw Error("All fields must be filled!")
    }
    //2.check if the email exist in the DB 
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Incorrect email")
    }
    //3.comapre the "hash(password)" associated with "user" in the db with out password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("Incorrect password")
    }


    return user
}


//static signup method
userSchema.statics.signupa = async function (email, password) {
    //validation
    //1.check if the email & password exist
    if (!email & !password) {
        throw Error("All fields must be filled!")
    }
    //2.check if the email is valid 
    if (!validator.isEmail(email)) {//return true or false
        throw Error("Email not valid")
    }
    //3.check if the password strong
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }


    //check the email is unique in the DB
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //save the hashedPassword in the DB
    const user = await this.create({ email, password: hash })
    return user
}

module.exports = mongoose.model("User", userSchema)