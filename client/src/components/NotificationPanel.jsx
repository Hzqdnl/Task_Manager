import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const data = [
    {
      _id: "65c5f12ab5204a81bde866ab",
      team: [
        "65c202d4aa62f32ffd1303cc",
        "65c30b96e639681a13def0b5",
        "65c317360fd860f958baa08e",
      ],
      text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
      task: {
        _id: "65c5f12ab5204a81bde866a9",
        title: "Test task",
      },
      notiType: "alert",
      isRead: [],
      createdAt: "2024-02-09T09:32:26.810Z",
      updatedAt: "2024-02-09T09:32:26.810Z",
      __v: 0,
    },
  ];

const Icons = {
    alert: (
        <HiBellAlert className="h-5 w-5 text-red-600"/>
    ),
    message: (
        <BiSolidMessageRounded className="h-5 w-5 text-gray-600 group-hover:text-indigo-600"/>
    )
}

const NotificationPanel = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    // const {data, refetch} = useGetNotificationsQuery();
    // const [markAsRead] = useMarkNotiAsReadMutation();

    const readHandler = () => {

    };

    const viewHandler = () => {

    };

    const callsToAction = [
        {name: 'Cancel', href: '#', icon: ''},
        {
            name: 'Mark as read',
            href: '#',
            icon: '',
            onClick: () => readHandler('all', ''),
        },
    ];

  return (
    <Popover className='relative'>
        <PopoverButton className='inline-flex items-center outline-none'>
          <div className='w-8 h-8 flex items-center justify-center text-black relative cursor-pointer'>
            <IoIosNotificationsOutline className='text-2xl' />
            {data?.length > 0 && (
              <span className='absolute text-center top-0 right-1 text-[12px] flex justify-center items-center text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
                {data?.length}
              </span>
            )}
          </div>
        </PopoverButton>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <PopoverPanel className='absolute cursor-pointer -right-16 md:-right-2 z-10 2xl:mt-5 mt-1 flex w-screen max-w-max px-4'>
            {({ close }) =>
              data?.length > 0 && (
                <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-200'>
                  <div className='2xl:p-4 p-2'>
                    {data?.slice(0, 5).map((item, index) => (
                      <div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-3xl 2xl:p-4 p-2 hover:bg-gray-50'
                      >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg'>
                          {Icons[item.notiType]}
                        </div>

                        <div
                          className='cursor-pointer'
                          onClick={() => viewHandler(item)}
                        >
                          <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                            <p> {item.notiType}</p>
                            <span className='text-xs font-normal lowercase'>
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className='line-clamp-1 mt-1 text-gray-600'>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='grid grid-cols-2 divide-x divide-gray-900 bg-white'>
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        onClick={
                          item?.onClick ? () => item.onClick() : () => close()
                        }
                        className={`flex items-center justify-center gap-x-2.5 p-3 font-semibold bg-white ${
                            item.name === 'Cancel' ? 'hover:text-red-400 text-red-600' : 'text-blue-600 hover:text-blue-400'
                          }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
          </PopoverPanel>
        </Transition>
    </Popover>
  )
}

export default NotificationPanel