import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

const Tabs = ({tabs, setSelected, children}) => {
  return (
    <div className='w-full px-1 sm:px-0'>
        <TabGroup>
            <TabList className='flex space-x-2 rounded-xl p-1'>
            {
                tabs.map((tab, index) => (
                    <Tab key={index + tab.title}
                    onClick={()=>setSelected(index)}
                    className={({selected})=> classNames('cursor-pointer w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-gray-100 shadow-md',
                        selected ? 'text-black border-b-2 border-gray-400' : 'text-gray-500 hover:text-gray-600'
                    )}
                    >
                    {tab.icon}
                    <span>{tab.title}</span>
                    </Tab>
                ))
            }
            </TabList>
            <TabPanels className='w-full mt-2'>
              {children}
            </TabPanels>
        </TabGroup>
    </div>
  )
}

export default Tabs