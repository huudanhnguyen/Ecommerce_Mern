import React from 'react'
import { navigation } from '../utils/contants'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='w-main h-[48px] py-[10px] text-sm flex items-center'>
        {navigation.map(el=>(
          <NavLink to={el.path} key={el.id} className='pr-12 hover:text-red-500'>
            {el.value}
          </NavLink>
        ))}
    </div>
  )
}

export default Navigation