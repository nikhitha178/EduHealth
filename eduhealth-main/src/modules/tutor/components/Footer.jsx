import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>EduHealth is your trusted partner for connecting with qualified tutors.
We make it easy to find, book with qualified tutors,
offering personalized support whenever you need it.
Your education, our priority.

</p>
        </div>

        <div>
  <p className='text-xl font-medium mb-5'>COMPANY</p>
  <ul className='flex flex-col gap-2 text-gray-600'>
    <li>
      <Link to="/" className='text-blue-600 underline'>Home</Link>
    </li>
    <li>
      <Link to="/about" className='text-blue-600 underline'>About us</Link>
    </li>
    <li>Privacy policy</li>
  </ul>
</div>

        <div>
  <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
  <ul className='flex flex-col gap-2 text-gray-600'>
    <li>
      <a href="tel:+12124567890" className='text-blue-600 underline'>
        +1-212-456-7890
      </a>
    </li>
    <li>
      <a href="mailto:eduhealth@gmail.com" className='text-blue-600 underline'>
        eduhealth@gmail.com
      </a>
    </li>
  </ul>
</div>


      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ EduHealth.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
