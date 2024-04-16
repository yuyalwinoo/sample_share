"use client";
import React from 'react';
import { useFormState } from 'react-dom';
import {createPost} from '@/actions'
const CreatePost = () => {
    const [state,action] = useFormState(createPost,{message:''})
    return (
        <div className='md:w-1/2 md:mx-auto my-10 md:my-20 px-4 md:px-0'>
            <p className='text-xs font-light text-gray-500'>Create your new post here.</p>
            {
                state.message && <p className='text-center text-sm text-red-600 py-2'>{state.message}</p>
            }
            <form action={action}>
                <div className='my-4'>
                    <label className='font-medium'>Title</label>
                    <input type='text' name='title' className='block p-2 w-full border border-gray-500 rounded-lg outline-none focus:none'/>
                </div>

                <div className='my-4'>
                    <label className='font-medium'>Description</label>
                    <textarea name='description' className='block p-2 w-full border border-gray-500 rounded-lg outline-none focus:none' rows={5}/>
                </div>

                <button type='submit' className='w-full p-2 bg-black text-white text-sm rounded-lg'>Post</button>
            </form>
        </div>
    )
}

export default CreatePost