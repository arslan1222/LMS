import express from "express";
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from "../controllers/educator.controller.js";
import { protectEducator } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";
const educatorRouter = express.Router();


educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.post('/add-course', protectEducator, upload.single('image'), addCourse);  // Form data will parsed using the multer
educatorRouter.get('/courses', protectEducator, getEducatorCourses);
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);
educatorRouter.get('/enrolled-student', protectEducator, getEnrolledStudentsData);


export default educatorRouter;