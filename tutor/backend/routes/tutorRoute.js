import express from 'express';
import { loginTutor, sessionsTutor, sessionCancel, tutorList, changeAvailablity, sessionComplete, tutorDashboard, tutorProfile, updateTutorProfile } from '../controllers/tutorController.js';
import authTutor from '../middleware/authTutor.js';
const tutorRouter = express.Router();

tutorRouter.post("/login", loginTutor)
tutorRouter.post("/cancel-session", authTutor, sessionCancel)
tutorRouter.get("/sessions", authTutor, sessionsTutor)
tutorRouter.get("/list", tutorList)
tutorRouter.post("/change-availability", authTutor, changeAvailablity)
tutorRouter.post("/complete-session", authTutor, sessionComplete)
tutorRouter.get("/dashboard", authTutor, tutorDashboard)
tutorRouter.get("/profile", authTutor, tutorProfile)
tutorRouter.post("/update-profile", authTutor, updateTutorProfile)

export default tutorRouter;