import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_TUTOR_BACKEND_URL

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [sessions, setSessions] = useState([])
    const [tutors, setTutors] = useState([])
    const [dashData, setDashData] = useState(false)

    // Getting all Tutors data from Database using API
    const getAllTutors = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-tutors', { headers: { aToken } })
            if (data.success) {
                setTutors(data.tutors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to change tutor availability using API
    const changeAvailability = async (tutId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { tutId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllTutors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // Getting all appointment data from Database using API
    const getAllSessions = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/sessions', { headers: { aToken } })
            if (data.success) {
                setSessions(data.sessions.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel session using API
    const cancelSession = async (sessionId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-session', { sessionId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllSessions()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

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
        aToken, setAToken,
        tutors,
        getAllTutors,
        changeAvailability,
        sessions,
        getAllSessions,
        getDashData,
        cancelSession,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider