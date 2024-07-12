import Link from "next/link";


const Home = () => {
  return (
    <div className="bg-black min-h-screen min-w-full  pt-20">

        <div className="">
            <div className="text-white text-center font-extrabold text-4xl tracking-wider">Music-Store</div>
        </div>
        <div className="text-white text-xl text-center my-5">
            Store Your Lyrics Anywhere Anytime
        </div>
        <div className="my-5 text-center">
            <Link href={`/login`} className="text-white mx-3 border-2 border-white p-1 rounded-md">
                Login
            </Link>
            <Link href={`/signup`} className="text-white mx-3 border-2 border-white p-1 rounded-md">
                SignUp
            </Link>
        </div>
    </div>
  )
}

export default Home;