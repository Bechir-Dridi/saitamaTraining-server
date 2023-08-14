const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true })//timestamps tells us when the doc was created or updated.

module.exports = mongoose.model("Workout", workoutSchema)