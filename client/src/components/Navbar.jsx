import React from 'react'
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import UserAvatar from './UserAvatar';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  return (
    <div className='flex justify-between items-center px-4 py-3 lg:py-4 sticky z-10 top-0 bg-[#F5F7FA] border-b-1 border-b-gray-200'>
        <div className='flex gap-4'>
            <button
            onClick={() => dispatch(setOpenSidebar(true))} 
            className='text-2xl text-purple-400 block md:hidden'>
            ☰
            </button>
            <div className='w-56 lg:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-gray-200 '>
                <MdOutlineSearch className='text-gray-600 text-xl'/>
                <input type="text" 
                placeholder='Search...'
                className='flex-1 md:text-base text-[14px] outline-none bg-transparent placeholder:text-gray-600 text-gray-800'
                />
            </div>
        </div>
        <div className='flex gap-2 items-center'>
            <NotificationPanel />

            <UserAvatar />
        </div>
    </div>
  )
}

export default Navbar