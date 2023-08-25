// developed by "Bechir Dridi"
// Portfolio: https://bechirdev.netlify.app
// twitter:   https://twitter.com/bechir7dridi
// linkedin:  https://linkedin.com/in/bechir-dev/
// github:    https://github.com/Bechir-Dridi
const express = require("express")
require("dotenv").config()
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")
const cors = require("cors")
//import userRoute
const userRoutes = require("./routes/user")



//express app
const app = express()

//middleware:

// Middleware to enable CORS
app.use(cors(
    { origin: ["http://localhost:3000", "https://bdev-saitama.netlify.app"], credentials: true, } //server accepts requests from static site
))


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//incoming req with a JSON payload, the JSON data will be parsed and available as `req.body` in your route handlers.
app.use(express.json())


//routes:
app.get("/test", (req, res) => {
    res.json({ mssg: "welcome to the app" })
})
app.use("/api/workouts", workoutRoutes)
//userRoute
app.use("/api/user", userRoutes)


//connect to DB:
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listening on port", process.env.PORT)
        })
    })
    .catch((error) => { console.log(error) })

