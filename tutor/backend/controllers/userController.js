import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import tutorModel from "../models/tutorModel.js";
import sessionModel from "../models/sessionModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book session 
const bookSession = async (req, res) => {

    try {

        const { userId, tutId, slotDate, slotTime } = req.body
        const tutorData = await tutorModel.findById(tutId).select("-password")

        if (!tutorData.available) {
            return res.json({ success: false, message: 'Tutor Not Available' })
        }

        let slots_booked = tutorData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete tutorData.slots_booked

        const sessionData = {
            userId,
            tutId,
            userData,
            tutData: tutorData, // ✅ fix is here
            amount: tutorData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        

        const newSession = new sessionModel(sessionData)
        await newSession.save()

        // save new slots data in tutorData
        await tutorModel.findByIdAndUpdate(tutId, { slots_booked })

        res.json({ success: true, message: 'Session Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel session
const cancelSession = async (req, res) => {
    try {

        const { userId, sessionId } = req.body
        const sessionData = await sessionModel.findById(sessionId)

        // verify session user s
        if (sessionData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await sessionModel.findByIdAndUpdate(sessionId, { cancelled: true })

        // releasing tutor slot 
        const { tutId, slotDate, slotTime } = sessionData

        const tutorData = await tutorModel.findById(tutId)

        let slots_booked = tutorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await tutorModel.findByIdAndUpdate(tutId, { slots_booked })

        res.json({ success: true, message: 'Session Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user sessions for frontend my-sessions page
const listSession = async (req, res) => {
    try {

        const { userId } = req.body
        const sessions = await sessionModel.find({ userId })

        res.json({ success: true, sessions })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {

        const { sessionId } = req.body
        const sessionData = await sessionModel.findById(sessionId)

        if (!sessionData || sessionData.cancelled) {
            return res.json({ success: false, message: 'Session Cancelled or not found' })
        }

        // creating options for razorpay payment
        const options = {
            amount: sessionData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: sessionData._id,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await sessionModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
    try {

        const { sessionId } = req.body
        const { origin } = req.headers

        const sessionData = await sessionModel.findById(sessionId)

        if (!sessionData || sessionData.cancelled) {
            return res.json({ success: false, message: 'Session Cancelled or not found' })
        }

        const currency = process.env.CURRENCY.toLocaleLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Session Fees"
                },
                unit_amount: sessionData.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&sessionId=${sessionData._id}`,
            cancel_url: `${origin}/verify?success=false&sessionId=${sessionData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    try {

        const { sessionId, success } = req.body

        if (success === "true") {
            await sessionModel.findByIdAndUpdate(sessionId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookSession,
    listSession,
    cancelSession,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe
}