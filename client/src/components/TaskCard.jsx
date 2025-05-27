import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdAttachFile } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { BiMessageAltDetail } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { bgs, formatDate, priorityStyles, taskType } from '../utils';
import clsx from 'clsx';
import TaskDialog from './Task/TaskDialog';
import UserInfo from './UserInfo';
import AddSubTask from './Task/AddSubTask';


const Icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

const TaskCard = ({task}) => {
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
  return (
    <>
    <div className='w-full h-fit bg-gray-100 shadow-md p-4 rounded hover:bg-gray-200'>
        <div className='w-full flex justify-between'>
        <div className={clsx('flex flex-1 gap-1 items-center text-sm font-medium', 
            priorityStyles[task?.priority])}>
                <span className='text-lg'>{Icons[task?.priority]}</span>
                <span className='uppercase'>{task?.priority} Priority</span>
        </div>
        {user?.role === 'admin' && <TaskDialog task={task} />}
        </div>
        <>
    <div className='flex items-center gap-2'>
        <div className={clsx('w-4 h-4 rounded-full', taskType[task.stage])} />
        <h4 className='line-clamp-1 text-black'>{task.title}</h4>
    </div>
    <span className='text-gray-600 text-sm'>
      {formatDate(new Date(task?.date))}
    </span>
    </>
    <div className='w-full border-t border-gray-200 my-2'/>
    <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-3'>
            <div className='flex gap-1 items-center text-sm'>
              <BiMessageAltDetail className='text-gray-400'/>
              <span className='text-gray-600'>{task?.activities?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm'>
              <MdAttachFile className='text-gray-400'/>
              <span className='text-gray-600'>{task?.activities?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm'>
              <FaList className='text-gray-400'/>
              <span className='text-gray-600'>{task?.activities?.length}</span>
            </div>
            </div>
            <div className='flex flex-row-reverse '>
              {task?.team?.map((m, index) => (
                <div
                key={index}
                className={clsx('w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1',
                  bgs[index % bgs?.length]
                )}
                >
                  <UserInfo user={m} />
                </div>
              ))}
            </div>
    </div>
    {/* sub task */}
    {task?.subTasks?.length > 0 ? (<div className='py-4 border-t border-gray-200'>
      <h5 className='text-gray-600 text-base line-clamp-1'>
        {task?.subTasks[0].title}
        </h5>
        <div className='p-4 space-x-8'>
          <span className='text-sm text-gray-600'>
            {formatDate(new Date(task?.subTasks[0]?.date))}
            </span>
            <span className='bg-blue-300/20 px-3 py-1 text-sm rounded-full text-blue-600 font-medium'>
              {task?.subTasks[0].tag}
            </span>
        </div>
    </div>) : (
      <>
      <div className='py-4 border-t border-gray-200'>
        <span className='text-gray-600'>No Sub Task</span>
        </div>
        </>
      )}
      <div className='w-full pb-2'>
      <button
      onClick={() => setOpen(true)}
      disabled={user.role === 'admin' ? false : true}
      className='w-full flex gap-4 cursor-pointer items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed
      disabled::text-gray-300'
      >
      <IoMdAdd className='text-lg'/>
        <span>Add Subtask</span>
      </button>
      </div>
    </div>
    <AddSubTask open={open} setOpen={setOpen} id={task._id}/>
    </>
  );
};

export default TaskCard