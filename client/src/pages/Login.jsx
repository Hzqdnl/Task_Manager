import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import taskLogo from '../assets/task-logo.png'
import Textbox from '../components/Textbox'
import Button from '../components/Button'
import { useSelector } from 'react-redux'

const Login = () => {
  const {user}= useSelector((state) => state.auth);
    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const navigate = useNavigate();

    const submitHandler = async(data)=>{
      console.log('submit')
    }

    useEffect(()=>{
      user && navigate('/dashboard');
    },[user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col md:flex-row bg-gradient-to-bl from-[#b900cb] via-white to-[#f5cc00]'>
        <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
          {/* left side */}
          <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm text-center border-blue-700 text-gray-600'>
            Organize all your tasks effortlessly in one place!
            </span>
            <p className='text-4xl xl:tracking-widest md:text-6xl 2xl:text-7xl font-black text-center text-[#750fb4]'>
              WorkSleek
            </p>
            <div>
              <div className='flex mx-auto w-[50%]'>
                <img className='rotate-360' src={taskLogo} alt="" />
              </div>
            </div>
          </div>
          </div>
          {/* right side */}
          <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 py-14'
            >
              <div className=''>
                <p className='font-bold text-[#750fb4] text-3xl text-center tracking-widest'>Welcome back!</p>
                <p className='text-center text-sm text-[#636363]'>
                  Keep all your credentials safe
                </p>
              </div>
              <div className='flex flex-col gap-y-5'>
                <Textbox 
                placeholder = 'email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded'
                register={register('email', {
                  required: 'Email Address is required',
                })}
                error={errors.email? errors.email.message:''}
                />
                <Textbox 
                placeholder = 'Password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded'
                register={register('password', {
                  required: 'Password is required',
                })}
                error={errors.password? errors.password.message:''}
                />
                <span className='text-sm text-center text-[#750fb4] hover:underline cursor-pointer'>
                  Forget Password?
                </span>
                <Button
                type= 'submit'
                label= 'Submit'
                className= 'w-full h-10 bg-blue-700 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300'
                />
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login