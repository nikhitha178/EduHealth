import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedTutors from '../components/RelatedTutors'
import axios from 'axios'
import { toast } from 'react-toastify' // Make sure you have this import

const Sessions = () => {
    const { tutId } = useParams()
    const { tutors, currencySymbol, backendUrl, token, getTutorsData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [tutInfo, setTutInfo] = useState(null)
    const [tutSlots, setTutSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const navigate = useNavigate()

    const fetchTutInfo = async () => {
        const tutInfo = tutors.find((tut) => tut._id === tutId)
        setTutInfo(tutInfo || null)
    }

    const getAvailableSlots = async () => {
        setTutSlots([])

        if (!tutInfo || !tutInfo.slots_booked) {
            return
        }

        const today = new Date()
        const newSlots = []

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(today)
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(Math.max(currentDate.getHours() + 1, 10))
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10, 0, 0, 0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()
                const slotDate = `${day}_${month}_${year}`

                const isSlotBooked = tutInfo.slots_booked?.[slotDate]?.includes(formattedTime)
                if (!isSlotBooked) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            newSlots.push(timeSlots)
        }

        setTutSlots(newSlots)
    }

    const bookSession = async () => {
        if (!token) {
            toast.warning('Login to book session')
            return navigate('/login')
        }

        const selectedSlot = tutSlots[slotIndex]?.find(slot => slot.time === slotTime)
        if (!selectedSlot) {
            toast.error('Please select a valid slot')
            return
        }

        const date = selectedSlot.datetime
        const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

        try {
            const minimalTutData = {
                name: tutInfo.name,
                degree: tutInfo.degree,
                speciality: tutInfo.speciality,
                image: tutInfo.image,
                _id: tutInfo._id,
              };
              
              const { data } = await axios.post(
                `${backendUrl}/api/user/book-session`,
                { tutId, slotDate, slotTime, tutData: minimalTutData },
                { headers: { token } }
              );
      if (data.success) {
                toast.success(data.message)
                getTutorsData()
                navigate('/my-sessions')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong while booking the session')
        }
    }

    useEffect(() => {
        if (tutors.length > 0) {
            fetchTutInfo()
        }
    }, [tutors, tutId])

    useEffect(() => {
        if (tutInfo) {
            getAvailableSlots()
        }
    }, [tutInfo])

    if (!tutInfo) return null

    return (
        <div>
            {/* Tutor Info */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={tutInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
                        {tutInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
                    </p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{tutInfo.degree} - {tutInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{tutInfo.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>
                            About <img className='w-3' src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{tutInfo.about}</p>
                    </div>
                    <p className='text-gray-600 font-medium mt-4'>
                        Session fee: <span className='text-gray-800'>{currencySymbol}{tutInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {tutSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index}
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] ? daysOfWeek[item[0].datetime.getDay()] : ''}</p>
                            <p>{item[0] ? item[0].datetime.getDate() : ''}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {tutSlots[slotIndex]?.map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index}
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button onClick={bookSession} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>
                    Book session
                </button>
            </div>

            {/* Related Tutors */}
            <RelatedTutors speciality={tutInfo.speciality} tutId={tutId} />
        </div>
    )
}

export default Sessions
