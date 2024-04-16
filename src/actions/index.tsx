"use server";

import db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (formState:{message:string},formdata:FormData) => {
    const title = formdata.get('title');
    const description = formdata.get('description');
    if(typeof title !== "string" || title.length < 5){
        return {
            message: 'Title must have at least 5 characters!'
        }
    }

    if(typeof description !== "string" || description.length < 20){
        return {
            message: 'Description must have at least 20 characters!'
        }
    }
    
    await db.post.create({
        data : {
            title,
            description
        }
    });
    revalidatePath("/");
    redirect("/");
}

export const getOldPost = async (id:number) => {
    return await db.post.findFirst({
        where : {
            id 
        }
    })
}

export const updatePost = async(formState: {
    message: string;
    id: number;
}, formdata: FormData) => {
    const title = formdata.get('title');
    const description = formdata.get('description');
    if(typeof title !== "string" || title.length < 5){
        return {
            message: 'Title must have at least 5 characters!',
            id: formState.id
        }
    }

    if(typeof description !== "string" || description.length < 20){
        return {
            message: 'Description must have at least 20 characters!',
            id: formState.id
        }
    }
    const upd = await db.post.update({
        where : {id:formState.id},
        data : {title,description}
    })
    revalidatePath("/");
    redirect("/");
}
