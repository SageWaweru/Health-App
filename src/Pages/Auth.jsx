function Auth() {
  return (
    <div>
      
      <div className='content-center p-10 bg-gray-200 m-10 rounded-lg w-[500px]'>
        <form action="">
            <h1 className='text-2xl align-center font-bold'>Enter Your Details</h1>
            <h4 className="text-sm font-bold">LOGIN</h4>
            <input type="text" placeholder='Full Name' className='w-full my-5 p-1 text-center rounded-xl'/>
            <br />
            <input type="email" placeholder='Email' className='w-full my-5 p-1 text-center rounded-xl' />
            <br />
            <input type="password" placeholder='Password' className='w-full my-5 p-1 text-center rounded-xl' />
            <br />
            <button className='bg-cyan-800 text-white font-semibold hover:bg-cyan-600 p-1 px-5 w-full my-5'>submit</button>

            
        </form>
      </div>
    </div>
  )
}

export default Auth
