import Link from "next/link"

const NotFound = () => {
  return (
    <div className=' flex text-sm items-center justify-center text-gray-500 font-bold mt-24'><p>No Data found. Create your post <Link href='/posts/create' className="text-blue-800 underline italic ">here</Link></p></div>
  )
}

export default NotFound