import {FcGoogle} from 'react-icons/fc'
import { signIn } from 'next-auth/react'

const SignIn = () => {
  return (
    <main className='w-screen h-screen bg-stone-900 flex flex-col gap-2'>
        <section className='flex flex-col justify-center items-center w-full h-[300px]'>
            <h4 className='text-orange-50 text-5xl font-[800]'>Welcome!</h4>
            <p className='text-stone-400 tracking-wider mt-2 text-[.8rem]'>Getting started with your family and friend's</p>
        <div onClick={() => signIn("google", {callbackUrl :"/"})} className='mt-5 flex justify-around items-center bg-orange-50 rounded-full shadow-sm p-3 gap-5 transition-[300ms] font-[500] hover:bg-stone-700 hover:text-stone-100'>
            <FcGoogle size={25}/>
            <p>Sign-in with google</p>
        </div>
        </section>
    </main>
  )
}

export default SignIn