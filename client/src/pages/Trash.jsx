import React, {useState} from 'react';
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineRestore } from 'react-icons/md';
import clsx from 'clsx';
import Button from '../components/Button';
import { tasks } from '../assets/data';
import Title from '../components/Title';
import { priorityStyles, taskType } from '../utils';
import ConfirmationDialog from '../components/ConfirmationDialog';

const Icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

const Trash = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const[type, setType] = useState('delete');
  const[selected, setSelected] = useState('');

  const deleteAllClick = () => {
    setType('deleteAll');
    setMsg('Do you want to permanently delete all the tasks?');
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType('restoreAll');
    setMsg('Do you want to restore all the tasks in the trash?')
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType('delete');
    setSelected(id);
    setOpenDialog(true)
  }

  const restoreClick = (id) => {
    setType('restore');
    setSelected(id);
    setMsg('Do you want to restore the selected task?');
    setOpenDialog(true);
  }

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black uppercase text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Stage</th>
        <th className='py-2 line-clamp-1'>Modified On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", taskType[item.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-gray-600'>
            {item?.title}
          </p>
        </div>
      </td>

      <td className='py-2 capitalize'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", priorityStyles[item?.priority])}>
            {Icons[item?.priority]}
          </span>
          <span className={clsx('',priorityStyles[item?.priority])}>{item?.priority}</span>
        </div>
      </td>

      <td className='py-2 capitalize text-center text-gray-600 md:text-start'>
        {item?.stage}
      </td>
      <td className='py-2 text-sm text-gray-600'>{new Date(item?.date).toDateString()}</td>

      <td className='py-2 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-700 hover:text-gray-400' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-500 hover:text-red-300' />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8 text-black'>
          <Title title='Trashed Tasks' />

          <div className='flex gap-2 md:gap-4 items-center'>
            <Button
              label='Restore All'
              icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center  text-white text-sm md:text-base rounded-md 2xl:py-2.5 bg-green-500 hover:bg-green-400 transition-all duration-300 ease-in-out'
              onClick={() => restoreAllClick()}
            />
            <Button
              label='Delete All'
              icon={<MdDelete className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center  text-white text-sm md:text-base rounded-md 2xl:py-2.5 bg-red-500 hover:bg-red-400 transition-all duration-300 ease-in-out'
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>
        <div className='bg-gray-100 px-2 md:px-6 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {tasks?.map((tk, id) => (
                  <TableRow key={id} item={tk} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <AddUser open={open} setOpen={setOpen} /> */}

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
}

export default Trash