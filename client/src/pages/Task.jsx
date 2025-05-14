import React, { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { MdGridView, MdOutlineAddToPhotos } from 'react-icons/md'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Title from '../components/Title';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import clsx from 'clsx';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import { tasks } from '../assets/data';
import { Table } from '../components/Task/Table';
import AddTask from '../components/Task/AddTask';

const tabs = [
  {title: 'Board View', icon: <MdGridView />},
  {title: 'List View', icon: <FaList />},
];

const taskType = {
  todo: "bg-red-600",
  'in progress': "bg-yellow-300",
  completed: "bg-green-500",
};

const Task = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const status = params?.status || '';

  return loading ? (
    <div className='py-10'>
      <Loader />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
      <Title title={status ? `${status} Tasks` : 'Tasks'} 
      className='text-black'
      />
      {
        !status && (<Button 
        onClick={() => setOpen(true)}
        label='Create'
        icon={<MdOutlineAddToPhotos className='text-xl text-white'/>}
        className = {clsx('items-center flex flex-row-reverse gap-1 text-white bg-blue-500 hover:bg-blue-400 transition-all duration-300 ease-in-out')}
        />
      )}
      </div>
      <div>
        <Tabs tabs={tabs} setSelected={setSelected}>
          {!status && (
            <div className='w-full flex justify-between gap-4 md:gap-x-8 py-4'>
              <TaskTitle label='To Do' className={taskType.todo} />
              <TaskTitle label='In Progress' className={taskType['in progress']} />
              <TaskTitle label='Completed' className={taskType.completed} />
            </div>
          )}
          {
            selected === 0 ? <BoardView tasks={tasks} /> : 
            <div className='w-full'>
              <Table 
              tasks={tasks}
              />
            </div>
          }
        </Tabs>

        <AddTask open={open} setOpen={setOpen}/>

      </div>
    </div>
  )
}

export default Task