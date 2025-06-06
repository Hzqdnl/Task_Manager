import React, { useState } from 'react'
import { MdKeyboardArrowDown, 
    MdKeyboardArrowUp, 
    MdKeyboardDoubleArrowUp, 
    MdAttachFile } from 'react-icons/md';
import { BiMessageAltDetail } from "react-icons/bi";
import { toast } from 'sonner'
import clsx from 'clsx';
import { bgs, formatDate, priorityStyles, taskType } from '../../utils';
import { FaList } from 'react-icons/fa';
import UserInfo from '../UserInfo';
import Button from '../Button';
import ConfirmationDialog from '../ConfirmationDialog';


const Icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

export const Table = ({tasks}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    
    const deleteClick = (id) => {
      setSelected(id);
      setOpenDialog(true);
    };

    const deleteHandler = () => {};

    const TableHeader = () => (
        <thead className='w-full border-b border-gray-300'>
          <tr className='w-full text-black uppercase text-left'>
            <th className='py-2'>Task Title</th>
            <th className='py-2'>Priority</th>
            <th className='py-2 line-clamp-1'>Created At</th>
            <th className='py-2'>Assets</th>
            <th className='py-2'>Team</th>
          </tr>
        </thead>
      );

      const TableRow = ({task}) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
            <td className='py-2'>
                <div className='flex items-center gap-2'>
                    <div 
                    className={clsx('w-4 h-4 rounded-full', taskType[task.stage])}
                    />
                    <p className='w-full line-clamp-2 text-base text-gray-600'>
                        {task?.title}
                    </p>
                </div>
            </td>
            <td className='py-2'>
                <div className='flex gap-1 items-center'>
                    <span className={clsx('text-lg', priorityStyles[task?.priority])}>
                        {Icons[task?.priority]}
                    </span>
                    <span className={clsx('capitalize line-clamp-1', priorityStyles[task?.priority])}>
                        {task?.priority} Priority
                    </span>
                </div>
            </td>
          <td className='py-2'>
            <span className='text-sm text-gray-600'>
              {formatDate(new Date(task?. date))}
            </span>
          </td>
          <td className='py-2'>
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
          </td>
          <td className='py-2'>
          <div className='flex'>
              {task?.team?.map((m, index) => (
                <div
                key={m._id}
                className={clsx('w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1',
                  bgs[index % bgs?.length]
                )}
                >
                  <UserInfo user={m} />
                </div>
              ))}
            </div>
          </td>
          <td className='py-2 flex gap-2 md:gap-4 justify-end'>
            <Button
            className='text-gray-700 hover:text-gray-400 sm:px-0 text-sm md:text-base'
            label='Edit'
            type='button'
            />
            <Button 
            className='text-red-500 hover:text-red-300 sm:px-0 text-sm md:text-base'
            label='Delete'
            type='button'
            onClick={() => deleteClick(task._id)}
            />
          </td>
        </tr>
      );

  return (
    <>
    <div className='bg-gray-100 px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* todo */}
      <ConfirmationDialog
      open = {openDialog}
      setOpen = {setOpenDialog}
      onClick = {deleteHandler}
      />
    </>
  )
}
