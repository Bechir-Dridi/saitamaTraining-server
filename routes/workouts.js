const express = require("express");
const router = express.Router();
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController");

//A. ---------- Protecting Routes ----------

//A1. import requireAuth middleware fct to protect workouts Routes
const requireAuth = require("../middleware/requireAuth")

//A2. we put it before all the routes to require Auth for all workouts routes
router.use(requireAuth)

//GET all workouts: 
router.get("/", getWorkouts)

//GET a single workout: 
router.get("/:id", getWorkout)

//POST a new workout:
router.post("/", createWorkout)

//DELETE a workout:
router.delete("/:id", deleteWorkout)

//UPDATE a workout:
router.put("/:id", updateWorkout)


module.exports = router