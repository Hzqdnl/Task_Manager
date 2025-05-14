import { Popover, PopoverPanel, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { getInitials } from '../utils';

const UserInfo = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='px-4'>
      <Popover className='relative'>
        <>
          <div
            className='group inline-flex items-center outline-none cursor-pointer'
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <span>{getInitials(user?.name)}</span>
          </div>

          <Transition
            as={Fragment}
            show={isOpen}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <PopoverPanel
              static
              className='absolute z-10 mt-3 w-80 max-w-[calc(100vw-2rem)] right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 px-4 sm:px-0 bg-white rounded-lg shadow-lg'
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className='flex items-center gap-4 rounded-lg shadow-lg bg-white p-4'>
                <div className='w-16 h-16 bg-gray-300 rounded-full text-black flex items-center justify-center text-2xl'>
                  <span>{getInitials(user?.name)}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <p className='text-black text-xl font-bold'>{user?.name}</p>
                  <span className='text-base text-gray-500'>{user?.title}</span>
                  <span className='text-blue-500'>
                    {user?.email ?? 'email@example.com'}
                  </span>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      </Popover>
    </div>
  );
};

export default UserInfo;
