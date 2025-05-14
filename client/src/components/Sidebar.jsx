import React from 'react';
import { MdDashboard, MdOutlineAddTask, MdOutlinePendingActions, MdSettings, MdTaskAlt } from 'react-icons/md';
import { FaTasks, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {setOpenSidebar} from '../redux/slices/authSlice';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const linkData = [
    {
        label: 'Dashboard',
        link: 'dashboard',
        icon: <MdDashboard />,
    },
    {
        label: 'Tasks',
        link: 'tasks',
        icon: <FaTasks />,
    },
    {
        label: 'Completed',
        link: 'completed/all',
        icon: <MdTaskAlt />,
    },
    {
        label: 'In Progress',
        link: 'in-progress/in progress',
        icon: <MdOutlinePendingActions />,
    },
    {
        label: 'To Do',
        link: 'todo/todo',
        icon: <MdOutlinePendingActions />,
    },
    {
        label: 'Team',
        link: 'team',
        icon: <FaUsers />,
    },
    {
        label: 'Trash',
        link: 'trashed',
        icon: <FaTrashAlt />,
    },
];

const Sidebar = () => {
    const {user} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const location = useLocation();

    const path = location.pathname.split("/")[1];
    //original
    // const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0,5);

    //dummyTest
    const sidebarLinks = user?.role === 'admin' ? linkData : linkData.slice(0,5);

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };

    const NavLink = ({el}) => {
        return (
            <Link to={el.link}
            onClick={closeSidebar}
            className={clsx('w-full 2xl:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-base'
                , path === el.link.split('/')[0] ? 'bg-gradient-to-r from-[#60A5FA] to-[#C3FBD8] text-white hover:text-white' : 'text-[#1F2937] hover:text-[#1F2937] hover:bg-[#CFE7FF]/80 transition-all duration-300 ease-in-out'
            )}
            >
                {el.icon}
                <span>{el.label}</span>
            </Link>
        );
    };

  return (
    <div className='w-full h-full flex flex-col gap-6 p-5 bg-[#E3E8F0] border-r-1 border-r-gray-200'>
        <h1 className='flex gap-1 items-center'>
            <p className='bg-blue-500 p-2 rounded-full'>
            <MdOutlineAddTask className='text-[#E3E8F0] text-2xl font-black cursor-pointer' />
            </p>
            <span className='text-lg font-bold text-[#1F2937]'>
                TaskMe
            </span>
        </h1>
        <div className='flex-1 flex flex-col gap-y-5 py-8'>
            {
                sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))
            }
        </div>
        <div className=''>
            <button className='w-full flex gap-2 p-2 items-center text-lg text-[#1F2937] cursor-pointer'>
                <MdSettings />
                <span>Settings</span>
            </button>
        </div>
    </div>
  )
}

export default Sidebar