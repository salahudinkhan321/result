import mongoose from "mongoose";



const studentSchema = new mongoose.Schema({

    name: {
        type: String
    },
    rollNo: {
        type: Number,
        required: true
    },
    fatherName: {
        type: String
    },
    marks: {
        type: Number
    },
    status: {
        type: Boolean
    }

}, { timestamps: true })



export const Student = mongoose.model('Student', studentSchema)