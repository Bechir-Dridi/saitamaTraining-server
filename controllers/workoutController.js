const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

//get all workouts
const getWorkouts = async (req, res) => {
    //grab user_id from req
    const user_id = req.myUser._id

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })//descending order
    res.status(200).json({ workouts })
}

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    //check the id isValid
    if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).json({ error: "no such workout" }) }

    const workout = await Workout.findById(id)

    if (!workout) { return res.status(400).json({ error: "no such workout" }) }

    res.status(200).json({ workout: workout })
}
//create new workout
const createWorkout = async (req, res) => {
    try {
        const { title, reps } = req.body
        const user_id = req.myUser._id
        console.log("MyUser id =>", req.myUser)
        //add doc to db
        const workout = await Workout.create({ title, reps, user_id })
        res.status(200).json({ the_workout: workout });
    } catch (error) {
        res.status(400).json({ Post_error: error.message })
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    //check the id isValid
    if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).json({ error: "no such workout" }) }

    const workout = await Workout.findByIdAndDelete({ _id: id })

    if (!workout) { return res.status(400).json({ error: "no such workout" }) }

    res.status(200).json({ workout: workout })
}

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    //check the id isValid
    if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).json({ error: "no such workout" }) }
    const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body })

    if (!workout) { return res.status(400).json({ error: "no such workout" }) }

    res.status(200).json({ workout: workout })
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}