import React, { useContext } from 'react'
import { TutorContext } from './context/TutorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllSessions from './pages/Admin/AllSessions';
import AddTutor from './pages/Admin/AddTutor';
import TutorsList from './pages/Admin/TutorsList';
import Login from './pages/Login';
import TutorSessions from './pages/Tutor/TutorSessions';
import TutorDashboard from './pages/Tutor/TutorDashboard';
import TutorProfile from './pages/Tutor/TutorProfile';

const App = () => {

  const { dToken } = useContext(TutorContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-sessions' element={<AllSessions />} />
          <Route path='/add-tutor' element={<AddTutor />} />
          <Route path='/tutor-list' element={<TutorsList />} />
          <Route path='/tutor-dashboard' element={<TutorDashboard />} />
          <Route path='/tutor-sessions' element={<TutorSessions />} />
          <Route path='/tutor-profile' element={<TutorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App