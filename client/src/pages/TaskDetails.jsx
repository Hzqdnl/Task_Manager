import React, {useState} from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineDoneAll, MdOutlineMessage, MdTaskAlt } from 'react-icons/md';
import { RxActivityLog } from "react-icons/rx";
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { tasks } from '../assets/data';
import { bgs, getInitials, priorityStyles, taskType } from '../utils';
import Tabs from '../components/Tabs';
import Loader from '../components/Loader';
import Button from '../components/Button';

const Assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const Icons = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const taskTypeIcon = {
  commented: (
    <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
      <MdOutlineMessage />
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
      <GrInProgress size={16} />
    </div>
  ),
};

const actTypes = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const TaskDetails = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const task = tasks[3];

  return (
    <div className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden'>
      <h1 className='text-2xl text-black font-semibold'>{task?.title}</h1>

      <Tabs tabs={TABS} setSelected={setSelected}>
{
  selected === 0 ? <>
  <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-gray-100 shadow-md p-8 overflow-y-auto'>
    {/* Left */}
    <div className='w-full md:w-1/2 space-y-8'>
      <div className='flex items-center gap-5'>
        <div className={clsx('flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full',
          priorityStyles[task?.priority], bgColor[task?.priority])}>
            <span className='text-lg'>{Icons[task?.priority]}</span>
            <span className='uppercase'>{task?.priority} Priority</span>
        </div>
        <div className={clsx('flex items-center gap-2')}>
          <div className={clsx('w-4 h-4 rounded-full', taskType[task?.stage])}/>
            <span className='text-black uppercase'>{task?.stage}</span>
        </div>
      </div>
      <p className='text-gray-600'>
        Created At: {new Date(task?.date) .toDateString()}
      </p>

      <div className='flex items-center gap-8 p-4 border-y border-gray-200'>
        <div className='space-x-2'>
          <span className='font-semibold'>Assets :</span>
          <span className='text-gray-600'>{task?.assets?.length}</span>
        </div>

        <span className='text-gray-400'>|</span>

        <div className='space-x-2'>
          <span className='font-semibold'>Sub-Task :</span>
          <span className='text-gray-600'>{task?.subTasks?.length}</span>
        </div>
      </div>

      <div className='space-y-4 py-6'>
          <p className='uppercase text-black font-semibold text-sm'>Task Team</p>
          <div className='space-y-3'>
            {task?.team?.map((m, index) => (
              <div
              key={index}
              className='flex gap-4 py-2 items-center border-t border-gray-300'
              >
                <div className={clsx('w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1', bgs[index % bgs.length])}>
                  <span className='text-center'>{getInitials(m?.name)}</span>
                </div>
                <div>
                  <p className='text-gray-600 text-lg font-semibold'>{m?.name}</p>
                  <span className='text-blue-600'>{m?.title}</span>
                </div>
              </div>
            ))}
          </div>
      </div>

      <div className='space-y-4 py-6'>
        <p className='text-gray-600 font-semibold text-sm'>Sub-Tasks</p>
        <div className='space-y-8'>
          {task?.subTasks?.map((el, index) => (
            <div
            key={index}
            className='flex gap-3'
            >
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-50'>
                <MdTaskAlt className='text-violet-600' size={26}/>
              </div>
              <div className='space-y-1'>
                <div className='flex gap-2 items-center'>
                  <span className='text-sm text-gray-600'>{new Date(el?.date) .toDateString()}</span>
                  <span className='px-2 py-0.5 text-center text-sm rounded-full bg-blue-600/20 text-blue-400 font-semibold'>{el?.tag}</span>
                </div>
                <p className='text-gray-600'>{el?.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Right */}
    <div className='w-full md:w-1/2 space-y-8'>
    <p className='text-lg font-semibold'>ASSETS</p>
    <div className='w-full grid grid-cols-2 gap-4'>
      {task?.assets?.map((el, index) => (
        <img 
        key={index}
        src={el}
        alt={task?.title}
        className='w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-105 hover:z-50'
        />
      ))}
    </div>
    </div>
  </div>
  </> : 
  <>
  <Activities activity={task?.activities} id={id}/>
  </>
}
      </Tabs>
    </div>
  )
}

const Activities = ({activity, id}) => {
  const [selected, setSelected] = useState(actTypes[0]);
  const [text, setText] = useState('');

  const isLoading = false;
  const handleSubmit = async() => {};

  const Card = ({item}) => {
    return <div className='flex space-x-4'>
      <div className='flex flex-col items-center flex-shrink-0'>
        <div className='w-10 h-10 flex items-center justify-center'>
        {taskTypeIcon[item?.type]}
        </div>
        <div className='w-full flex items-center justify-center'>
          <div className='w-0.5 bg-gray-300 h-18'/>
        </div>
      </div>
      <div className='flex flex-col gap-y-1 mb-8'>
      <p className='font-semibold'>{item?.by?.name}</p>
      <div className='text-gray-600 space-y-2'>
        <span className='capitalize'>{item?.type} </span>
        <span className='text-sm'>{moment(item?.date).fromNow()}</span>
      </div>
      <div className='text-gray-700'>
        {item?.activity}
      </div>
      </div>
    </div>
  };

  return (
  <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-gray-100 shadow rounded-md justify-between
  overflow-y-auto'>
    <div className='w-full md:w-1/2'>
    <h4 className='text-black font-semibold text-lg mb-5'>Activities</h4>
    <div className='w-full'>
      {activity?.map((el, index) => (
        <Card 
        key={index}
        item={el}
        isConnected = {index < activity.length - 1}
        />
      ))}
    </div>
    </div>
    <div className='w-full md:w-1/3'>
      <h4 className='text-gray-600 font-semibold text-lg mb-5'>Add Activity</h4>
      <div className='w-full flex flex-wrap gap-5'>
        {actTypes.map((item, index) => (
          <div key={item} className='flex gap-2 items-center'>
            <input type="checkbox"
            className='w-4 h-4'
            checked={selected === item ? true : false}
            onChange={(e) => setSelected(item)}
            />
            <p>{item}</p>
          </div>
        ))}
        <textarea 
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Activity details.....'
        className='bg-gray-100 w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
        ></textarea>
        {
        isLoading ? (
          <Loader />
        ) : (
          <Button 
          type='button'
          label='Submit'
          onClick={handleSubmit}
          className='bg-blue-600 text-white rounded'
          />
        )
        }
      </div>
    </div>
  </div>
  );
}
export default TaskDetails