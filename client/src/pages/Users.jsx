import React, { useState } from 'react'
import Title from '../components/Title';
import clsx from 'clsx';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { summary } from '../assets/data';
import { bgs, getInitials } from '../utils';

const Users = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-black text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
      </tr>
    </thead>
  );

const TableRow = ({user, index}) => (
  <tr className='border-b border-b-gray-200 text-gray-600 hover:bg-gray-400/10'>
    <td className='p-2'>
      <div className='flex items-center gap-3'>
      <div className={clsx('w-9 h-9 rounded-full text-white flex items-center justify-center text-sm', bgs[index % bgs.length])}>
        <span className='text-xs md:text-sm text-center'>
          {getInitials(user.name)}
        </span>
      </div>
      {user.name}
      </div>
    </td>
    <td className='p-2'>{user.title}</td>
    <td className='p-2'>{user.email || 'user@email.com'}</td>
    <td className='p-2'>{user.role}</td>

    <td>
      <button 
      // onClick={() => userStatusClick(user)}
      className={clsx('w-fit px-4 py-1 rounded-full bg-gray-700/5',
        user?.isActive ? 'text-green-500' : 'text-red-500'
      )}
      >
        {user?.isActive ? 'Active' : 'Disabled'}
      </button>
    </td>

    <td className='p-2 flex gap-4 justify-end'>
      <Button 
      className='text-gray-700 hover:text-gray-400 font-semibold sm:px-0'
      label='Edit'
      type='button'
      // onClick={() => editClick(user)}
      />
      <Button 
      className='text-red-500 hover:text-red-300 font-semibold sm:px-0'
      label='Delete'
      type='button'
      // onClick={() => deleteClick(user._id)}
      />
    </td>
  </tr>
);

  return (
    <div className='w-full md:px-1 px-0 mb-6'>
      <div className='flex items-center justify-between mb-8'>
        <Title title = 'Team Members' className={clsx('text-black')}/>
        <Button
        label='New User'
        icon={<IoMdAdd className='text-lg' />}
        className='flex flex-row-reverse gap-1 items-center text-white bg-[#60A5FA] hover:bg-blue-300 transition-all duration-300 ease-in-out'
        onClick= {() => setOpen(true)}
        />
      </div>
      <div className='bg-gray-100 px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full mb-5'>
            <TableHeader />
            <tbody>
              {summary.users?.map((user, index) => (
                <TableRow key={index} user={user} index={index}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users