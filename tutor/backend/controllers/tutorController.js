import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import tutorModel from "../models/tutorModel.js";
import sessionModel from "../models/sessionModel.js";

// API for tutor Login 
const loginTutor = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await tutorModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get tutor sessions for tutor panel
const sessionsTutor = async (req, res) => {
    try {

        const { tutId } = req.body
        const sessions = await sessionModel.find({ tutId })

        res.json({ success: true, sessions })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel session for tutor panel
const sessionCancel = async (req, res) => {
    try {

        const { tutId, sessionId } = req.body

        const sessionData = await sessionModel.findById(sessionId)
        if (sessionData && sessionData.tutId === tutId) {
            await sessionModel.findByIdAndUpdate(sessionId, { cancelled: true })
            return res.json({ success: true, message: 'Session Cancelled' })
        }

        res.json({ success: false, message: 'Session Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark session completed for tutor panel
const sessionComplete = async (req, res) => {
    try {
        const { tutId, sessionId } = req.body;

        const sessionData = await sessionModel.findById(sessionId);

        if (sessionData && sessionData.tutId === tutId) {
            await sessionModel.findByIdAndUpdate(sessionId, { isCompleted: true });
            return res.json({ success: true, message: 'Session Completed' });
        }

        res.json({ success: false, message: 'Invalid Session or Tutor ID' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// API to get all tutors list for Frontend
const tutorList = async (req, res) => {
    try {

        const tutors = await tutorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, tutors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change tutor availability for Admin and Tutor Panel
const changeAvailablity = async (req, res) => {
    try {

        const { tutId } = req.body

        const tutorData = await tutorModel.findById(tutId)
        await tutorModel.findByIdAndUpdate(tutId, { available: !tutorData.available })
        res.json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get tutor profile for Tutor Panel
const tutorProfile = async (req, res) => {
    try {

        const { tutId } = req.body
        const profileData = await tutorModel.findById(tutId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update tutor profile data from Tutor Panel
const updateTutorProfile = async (req, res) => {
    try {

        const { tutId, fees, address, available } = req.body

        await tutorModel.findByIdAndUpdate(tutId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for tutor panel
const tutorDashboard = async (req, res) => {
    try {

        const { tutId } = req.body

        const sessions = await sessionModel.find({ tutId })

        let earnings = 0

        sessions.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let students = []

        sessions.map((item) => {
            if (!students.includes(item.userId)) {
                students.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            sessions: sessions.length,
            students: students.length,
            latestSessions: sessions.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginTutor,
    sessionsTutor,
    sessionCancel,
    tutorList,
    changeAvailablity,
    sessionComplete,
    tutorDashboard,
    tutorProfile,
    updateTutorProfile
}