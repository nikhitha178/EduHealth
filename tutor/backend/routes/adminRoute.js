import express from 'express';
import { loginAdmin,sessionsAdmin,sessionCancel,addTutor,allTutors,adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/tutorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-tutor", authAdmin, upload.single('image'), addTutor)
adminRouter.get("/sessions", authAdmin, sessionsAdmin)
adminRouter.post("/cancel-session", authAdmin, sessionCancel)
adminRouter.get("/all-tutors", authAdmin, allTutors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)
//adminRouter.get("/get-sessions", authAdmin, sessionsAdmin)
export default adminRouter;