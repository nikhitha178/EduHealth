import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>EduHealth is your trusted partner for connecting with qualified doctors.
We make it easy to find, book, and consult with healthcare professionals,
offering personalized care whenever you need it.
Your health, our priority.

</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
  <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
  <ul className='flex flex-col gap-2 text-gray-600'>
    <li>
      <a href="tel:+911234567890" className="hover:underline text-blue-600">+911234567890</a>
    </li>
    <li>
      <a href="mailto:eduhealthbookings@gmail.com" className="hover:underline text-blue-600">eduhealthbookings@gmail.com</a>
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
