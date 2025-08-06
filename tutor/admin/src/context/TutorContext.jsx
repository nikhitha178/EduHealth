import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'


export const TutorContext = createContext()

const TutorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [sessions, setSessions] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    // Getting Tutor session data from Database using API
    const getSessions = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/tutor/sessions', { headers: { dToken } })

            if (data.success) {
                setSessions(data.sessions.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Getting Tutor profile data from Database using API
    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/tutor/profile', { headers: { dToken } })
            console.log(data.profileData)
            setProfileData(data.profileData)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel tutor session using API
    const cancelSession = async (sessionId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/tutor/cancel-session', { sessionId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getSessions()
                // after creating dashboard
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to Mark session completed using API
    const completeSession = async (sessionId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/tutor/complete-session',
                { sessionId },
                { headers: { dToken } }
            );
    
            if (data.success) {
                toast.success(data.message);
                getSessions();     // ✅ Refreshes session list
                getDashData();     // ✅ Updates dashboard stats (assuming it's already implemented)
            } else {
                toast.error(data.message);
            }
    
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    

    // Getting Doctor dashboard data using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/tutor/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        dToken, setDToken, backendUrl,
        sessions,
        getSessions,
        cancelSession,
        completeSession,
        dashData, getDashData,
        profileData, setProfileData,
        getProfileData,
    }

    return (
        <TutorContext.Provider value={value}>
            {props.children}
        </TutorContext.Provider>
    )


}

export default TutorContextProvider