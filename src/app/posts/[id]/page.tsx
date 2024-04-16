import db from "@/db"
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation"

interface PostDetailParam {
    params : {
        id : string
    }
}
export default async function PostDetail(props:PostDetailParam) {
    await new Promise(r=> setTimeout(r,1000));

    const id = +props.params.id;
    const post = await db.post.findFirst({
        where : {id}
    })
    const deletePost = async () => {
        "use server";
        await db.post.delete({
            where:{id}
        })
        revalidatePath("/");
        redirect("/");
    }
    return(<>
       {
        post && 
        <div className="space-y-5 my-3">
            <div className="flex justify-between">
            <h4 className="text-md md:text-xl font-bold w-2/3 uppercase">{post.title}</h4>
            <div className="space-x-3">
                <Link href={`/posts/${post.id}/edit`} className="bg-black text-white p-2 rounded-lg">Edit</Link>
                <form action={deletePost} className="inline">
                    <button className="bg-black text-white p-1.5 rounded-lg">Delete</button>
                </form>
            </div>
            </div>
            <p>{post.description}</p>
        </div>
       }
       {
        !post && notFound()
       }
    </>)
}

export const generateStaticParams = async() => {
    const posts = await db.post.findMany();
    return posts.map(post=>{
        return {
            id:post.id.toString()
        }
    })
}