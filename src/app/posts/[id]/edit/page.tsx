"use client";
import { getOldPost, updatePost} from "@/actions";
import { notFound, redirect } from "next/navigation"
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface PostEditInterface {
    params : {
        id : string
    }
}
export default function EditPost(props:PostEditInterface){
    const id = +props.params.id;
    const [oldPost,setOldPost] = useState<{ id: number; title: string; description: string; } |null>(null);
    const getOldData = async()=> {
        const post = await getOldPost(id);
        console.log(post);
        setOldPost(post);
    }
    useEffect(()=>{
        getOldData();
    },[])

    const [state,action] = useFormState(updatePost,{message:'',id});

    return(
        <div className='md:w-1/2 md:mx-auto my-10 md:my-20 px-4 md:px-0'>
            <p className='text-xs font-light text-gray-500'>Edit your post.</p>
            {
                state.message && <p className='text-center text-sm text-red-600 py-2'>{state.message}</p>
            }
            <form action={action}>
                <div className='my-4'>
                    <label className='font-medium'>Title</label>
                    <input 
                        type='text' 
                        name='title' 
                        defaultValue={oldPost?.title}
                        className='block p-2 w-full border border-gray-500 rounded-lg outline-none focus:none'/>
                </div>

                <div className='my-4'>
                    <label className='font-medium'>Description</label>
                    <textarea 
                        name='description' 
                        defaultValue={oldPost?.description}
                        className='block p-2 w-full border border-gray-500 rounded-lg outline-none focus:none' 
                        rows={5}/>
                </div>

                <button type='submit' className='w-full p-2 bg-black text-white text-sm rounded-lg'>Post</button>
            </form>
        </div>
    )
}