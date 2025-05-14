import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Toaster } from "sonner";
import { IoMdCloseCircleOutline } from "react-icons/io";
import './App.css';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Task from './pages/task';
import TaskDetails from './pages/taskdetails';
import Trash from './pages/trash';
import Users from './pages/users';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Fragment, useRef } from 'react';
import { setOpenSidebar } from './redux/slices/authSlice';
import { Transition } from '@headlessui/react';

function Layout(){
  const {user}= useSelector((state) => state.auth);
  const location = useLocation()

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>

      <Navbar />

      <div className='p-4 2xl:px-10'>
        <Outlet />
      </div>
      </div>
    </div>
  ):(
    <Navigate to='/log-in' state={{from: location}} replace/>
  )
}

const MobileSidebar = () => {
  const {isSidebarOpen} = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false))
  };

return (
  <>
   <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700 ease-in-out'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-700 ease-in-out'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div ref={(node) => (mobileMenuRef.current = node)}
          className={clsx('md:hidden w-full h-full bg-[#2A2A2A]/40 transition-all duration-700 transform'
           , isSidebarOpen ? 'translate-x-0':'translate-x-full'
          )}
          onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                onClick={() => closeSidebar()}
                className='flex justify-end items-end text-white'
                >
                  <IoMdCloseCircleOutline size={20}/>
                </button>
              </div>
              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
  </>
);
};

function App() {
  return (
    <main className='w-full min-h-screen bg-[#FAFAFB]'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Task />} />
          <Route path='/completed/:status' element={<Task />} />
          <Route path='/in-progress/:status' element={<Task />} />
          <Route path='/todo/:status' element={<Task />} />
          <Route path='/team' element={<Users />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>
          <Route path='/log-in' element={<Login />} />
      </Routes>

      <Toaster richColors/>
    </main>
  )
}

export default App
