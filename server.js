const express = require("express")
require("dotenv").config()
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")
//import userRoute
const userRoutes = require("./routes/user")



//express app
const app = express()

//middleware:

// Middleware to enable CORS
app.use(cors(
    { origin: ["http://localhost:3000", "https://saitama-server.onrender.com"], credentials: true, } //server accepts requests from loclahost 3000 and static site
))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

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

