import React from 'react'
import ModalWrapper from '../ModalWrapper'
import { DialogTitle } from '@headlessui/react'
import Textbox from '../Textbox';
import { useForm } from 'react-hook-form';

const AddTask = ({open, setOpen}) => {
    const task = '';
    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm();

    const submitHandler = () => {};

  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
            <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
            >
            {task ? 'Update Task' : 'Add Task'}
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
            </div>
        </form>
    </ModalWrapper>
    </>
  )
}

export default AddTask