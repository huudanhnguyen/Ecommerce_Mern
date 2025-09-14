import React from 'react'
import logo from '../assets/logo.png'
import icons from '../utils/icons'
import {Link} from 'react-router-dom'
import path from '../utils/path'



const { MdLocalPhone,MdOutlineEmail,FaUser,FaBagShopping } = icons;

const header = () => {
  return (
    <div className=' w-main flex justify-between h-[11px] py-[35px]'>
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt='logo' className='w-[234px] h-[24px]' />
        </Link>
        <div className='flex text-[13px]'>
          <div className='flex flex-col items-center px-6 border-r'>
            <span className='flex gap-3 items-center'>
              <MdLocalPhone color='red'/>
              <span className='font-semibold'>0362 7148 69</span>
            </span>
            <span>
              <span className='text-gray-500'>Mon-Sat 9:00AM - 8:00PM</span>
            </span>
          </div>

          <div className='flex flex-col items-center px-6 border-r'>
            <span className='flex gap-3 items-center'>
              <MdOutlineEmail color='red'/>
              <span className='font-semibold'>support@huudanh.com</span>
            </span>
            <span>
              <span className='text-gray-500'>Online Support 24/7</span>
            </span>
          </div>

          <div className="flex flex-col items-center px-6 border-r">
            <div className="flex gap-2 items-center">
            <FaBagShopping color="red"/>
            <span className="font-semibold">0 item(s)</span>
            </div>
          </div>

        </div>
    </div>
  )
}

export default header