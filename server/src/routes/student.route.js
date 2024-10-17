import { findStudent } from "../controllers/student.js";
import { Router } from "express";


const router = Router()


router.route('/result').post(findStudent)


export default router