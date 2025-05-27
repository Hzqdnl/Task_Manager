import React, { useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { DialogTitle } from '@headlessui/react'
import Textbox from '../Textbox';
import { useForm } from 'react-hook-form';
import UserList from './UserList';
import SelectList from '../SelectList';
import { BiImages } from "react-icons/bi";
import Button from '../Button';

const Listing = ['Todo', 'In Progress', 'Completed'];
const Priority = ['High', 'Medium', 'Normal', 'Low'];

const uploadedFileURLs = [];

const AddTask = ({open, setOpen}) => {
    const task = '';
    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm();

    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage?.toUpperCase() || Listing[0]);
    const [priority, setPriority] = useState(task?.priority?.toUpperCase() || Priority[2]);

    const [assets, setAssets] = ([]);
    const [uploading, setUploading] = useState(false);

    const submitHandler = () => {};
    const handleSelect = (e) => {
        setAssets(e.target.files);
    };

  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
            <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
            >
            {task ? 'Update Task' : 'Create Task'}
            </DialogTitle>
            <div className='mt-2 flex flex-col gap-6'>
                <Textbox 
                placeholder = 'Task Title'
                type = 'text'
                name = 'title'
                label = 'Task Title'
                className = 'w-full rounded'
                required = {register('title', {required: 'Title is required'})}
                error = {errors.title ? errors.title.message: ''}
                />
                <UserList 
                setTeam = {setTeam}
                team = {team}
                />
                <div className='flex gap-4'>
                <SelectList 
                label='Task Stage'
                lists = {Listing}
                selected = {stage}
                setSelected = {setStage}
                />
                <div className='w-full'>
                    <Textbox 
                    placeholder = 'Date'
                    type = 'date'
                    name = 'date'
                    label = 'Task Date'
                    className = 'w-full h-[42px] px-3 py-2 rounded appearance-none'
                    register = {register('date', {required: 'Date is required'})}
                    error={errors.date ? errors.date.message : ''}
                    />
                </div>
            </div>
                <div className='flex gap-4'>
                    <SelectList 
                    label='Priority Level'
                    lists={Priority}
                    selected={priority}
                    setSelected={setPriority}
                    />
                    <div className='w-full flex items-center justify-center mt-4'>
                        <label
                        className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                        htmlFor='imgUpload'
                        >
                            <input 
                            type='File'
                            className='hidden'
                            id='imgUpload'
                            onChange={(e) => handleSelect(e)}
                            accept='.jpg, .png, .jpeg'
                            multiple={true}
                            />
                            <BiImages />
                            <span>Add assets</span>
                        </label>
                    </div>
                </div>
                </div>

                <div className='py-6 sm:flex sm:flex-row-reverse gap-4'>
                    {uploading ? (
                        <span className='text-sm py-2 text-red-500'>
                            Uploading assets
                        </span>
                    ) : (
                        <Button 
                        label = 'Submit'
                        type='submit'
                        className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700
                        sm:w-auto'
                        />
                    )}
                    <Button 
                    type='button'
                    className='bg-white text-red-500 px-5 text-sm font-semibold hover:text-red-700 sm:w-auto'
                    onClick={() => setOpen(false)}
                    label = 'Cancel'
                    />
                </div>
        </form>
    </ModalWrapper>
    </>
  )
}

export default AddTask