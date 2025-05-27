import React from 'react';
import {
  MdAdminPanelSettings,
  MdOutlineSummarize, 
  MdKeyboardArrowDown, 
  MdKeyboardArrowUp, 
  MdKeyboardDoubleArrowUp } 
  from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary, tasks } from '../assets/data'
import clsx from 'clsx';
import Chart from '../components/Chart';
import { bgs, getInitials, priorityStyles, taskType } from '../utils';
import UserInfo from '../components/UserInfo';

const UserTable = ({users}) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 dark:border-gray-600'>
      <tr className='text-black text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

const TableRow = ({user})=>(
  <tr className='border-b border-gray-200 text-gray-600 dark:text-gray-400 hover:bg-gray-400/10'>
    <td className='py-2'>
      <div className='flex gap-3 items-center'>
        <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-gradient-to-br from-[#60A5FA] to-[#C3FBD8]'>
          <span className='text-center'>{getInitials(user?.name)}</span>
        </div>
        <div>
          <p>{user.name}</p>
          <span className='text-xs text-blue-600'>{user?.role}</span>
        </div>
      </div>
    </td>
    <td>
      <p
      className={clsx('w-fit px-3 py-1 bg-gray-700/5 rounded-full text-sm', user?.isActive ? 'text-green-500' : 'text-red-500')}
      >
        {user?.isActive ? 'Active' : 'Disabled'}
      </p>
    </td>
    <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
  </tr>
);

  return (
    <div className='w-full md:w-1/3 bg-gray-100 h-fit px-2 md:px-6 py-4 shadow-md rounded'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user,index)=>(
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TaskTable = ({tasks}) => {
  const icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />
  };

const TableHeader = () => (
  <thead className='border-b border-gray-300'>
    <tr className='text-black uppercase text-left'>
      <th className='py-2'>Task Name</th>
      <th className='py-2'>Priority</th>
      <th className='py-2'>Team</th>
      <th className='py-2 hidden md:block'>Created At</th>
    </tr>
  </thead>
);

const TableRow = ({task}) => <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
<td className='py-2 cursor-pointer'>
  <div className='flex items-center gap-2'>
    <div className={clsx('w-4 h-4 rounded-full', taskType[task.stage])} />
    <p>{task.title}</p>
  </div>
</td>
<td className='py-2 cursor-pointer'>
  <div className='flex items-center gap-1'>
    <span className={clsx('text-lg', priorityStyles[task.priority])}>{icons[task.priority]}</span>
    <span className='capitalize'>{task.priority}</span>
  </div>
</td>
<td className='py-2 cursor-pointer'>
  <div className='flex'>
    {task.team.map((m, index) => (
      <div
      key={index}
      className={clsx('w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1',
        bgs[index % bgs.length]
      )}
      >
        <UserInfo user={m} />
      </div>
    ))}
  </div>
</td>
<td className='py-2 hidden md:block'>
  <span className='text-[13px] text-gray-600'>
    {moment(task?.date).fromNow()}</span>
</td>
</tr>;
return (
  <>
  <div className='w-full md:w-2/3 bg-gray-100 px-2 md:px-4 pt-4 pb-4 shadow-md rounded'> {/*md:w-2/3*/}
    <table className='w-full'>
      <TableHeader />
      <tbody>
        {
          tasks?.map((task, id) => (
            <TableRow 
            key = {id}
            task = {task}
            />
          ))
        }
      </tbody>
    </table>
  </div>
  </>
);
};

const Dashboard = () => {

  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL",
      total: summary?.totalTasks || 0,
      icon: <MdOutlineSummarize className='text-3xl'/>,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings className='text-3xl' />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <FaEdit className='text-2xl'/>,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot className='text-2xl'/>,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({label, count, bg, icon}) => {
    return (
      <div className='w-full h-32 bg-gray-100 p-5 rounded-md flex items-center justify-between shadow-md'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-blue-700'>{label}</p>
          <span className='text-black text-2xl font-semibold'>{count}</span>
          <span className='text-gray-500 text-sm'>{'8 last month'}</span>
        </div>
        <div className={clsx(
          'w-10 h-10 rounded-full flex items-center justify-center text-white',
          bg)}>
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {
          stats.map(({icon, bg, label, total}, index) => (
            <Card 
            key = {index}
            icon = {icon}
            bg = {bg}
            label = {label}
            count = {total}
            />
          ))
        }
      </div>
      {/* chart */}
      <div className='w-full bg-gray-100 mt-16 p-4 rounded shadow-md'>
        <h1 className='text-2xl font-semibold text-black text-center'>Chart by Priority</h1>
        <Chart />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* left */}
          <TaskTable 
          tasks={summary.last10Task}
          />
        {/* right */}
        <UserTable users={summary.users}/>
      </div>
    </div>
  );
};

export default Dashboard