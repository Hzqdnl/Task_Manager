import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ModalWrapper from './ModalWrapper';
import { DialogTitle } from '@headlessui/react';
import Textbox from './Textbox';
import Loader from './Loader';
import Button from './Button';

const AddUser = ({open, setOpen, userData}) => {
    let defaultValues = userData ?? {};
    const { user } = useSelector((state) => state.auth);

    const isLoading = false, 
          isUpdating = false;

    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm({defaultValues});

    const handleOnSubmit = () => {};

  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
        <DialogTitle
        as='h2'
        className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          {userData ? 'UPDATE PROFILE' : 'ADD NEW USER'}
        </DialogTitle>
        <div className='mt-2 flex flex-col gap-4'>
          <Textbox 
          placeholder='Full Name'
          type='text'
          name='name'
          label='Full Name'
          className='w-full rounded'
          register={register('name', {
            required: 'Full name is required',
          })}
          error={errors.name ? errors.name.message : ''}
          />
          <Textbox 
          placeholder='Title'
          type='text'
          name='title'
          label='Title'
          className='w-full rounded'
          register={register('title', {
            required: 'Title is required',
          })}
          error={errors.title ? errors.title.message : ''}
          />
          <Textbox 
          placeholder='Email Address'
          type='email'
          name='email'
          label='Email Address'
          className='w-full rounded'
          register={register('email',{
            required:'Email is required'
          })}
          error={errors.email ? errors.email.message : ''}
          />
          <Textbox 
          placeholder='Role'
          type='text'
          name='role'
          label='Role'
          className='w-full rounded'
          register={register('role', {
            required: 'Role is required'
          })}
          error={errors.role ? errors.role.message : ''}
          />
        </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loader />
            </div>
          ):(
            <div className='py-3 mt-4 flex sm:flex-row-reverse'>
              <Button 
              type='submit'
              className='bg-blue-500 px-8 text-sm font-semibold text-white hover:bg-blue-400  sm:w-auto'
              label='Submit'
              />
              <Button 
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 hover:text-red-500 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
              />
            </div>
          )}

      </form>
    </ModalWrapper>
    </>
  )
};

export default AddUser