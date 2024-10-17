import { Student } from "../models/Student.js"


const findStudent = async (req, res) => {
    try {

        const { rollNo } = req.body

        console.log(rollNo)

        if (!rollNo) {
            return res.status(400).json({ message: "Enter Roll No", error: true })
        }

        const user = await Student.findOne({ rollNo })

        if (!user) {
            return res.status(400).json({ message: "Student Not Found", error: true })
        }

        return res.status(200).json({ message: "Result is here", data: user, success: true })


    } catch (error) {
        return res.status(400).json({ message: "Student Not Found", error: true })
    }
}

export { findStudent }