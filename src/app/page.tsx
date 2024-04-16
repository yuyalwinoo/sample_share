import db from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface postInterface {
  id: number;
  title: string;
  description: string;
}
const PostItem = ({id,title,description}:postInterface) => {
  return(
    <div className="my-3 border-b " >
        <Link href={`posts/${id}`} className="text-xl font-bold uppercase">{title}</Link>
        <p className="text-sm text-gray-500 mb-5">{description?.length > 150 ? `${description.substring(0,150)} ...` : description}</p>
    </div>
  )
}
//export const dynamic = "force-dynamic";
export default async function Home() {
  const posts = await db.post.findMany({
    orderBy : {
      id: 'desc'
    }
  });
  
  return (
    <>
        {
          posts?.map(({id,title,description}:postInterface) =>{
            return(
              <PostItem key={id} id={id} title={title} description={description}/>
            ) 
          })
        }
        {
          posts.length < 1 && notFound()
        }
    </>
  );
}
