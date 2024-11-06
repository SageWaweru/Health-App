function Auth() {

  return (
    <div>
      <div className='content-center'>
        <form action="" className="flex flex-col shadow-lg w-[500px] rounded-lg bg-stone-50">
            <h1 className='align-center rounded-t-lg h-16 pt-4 font-semibold text-2xl text-orange-50 bg-cyan-800 w-[500px]'>User Registration Form</h1>
            <div className="flex flex-col p-4 text-left ">
              <label htmlFor="name" className="mb-2 mt-4">Name</label>
              <input type="text" placeholder='Full Name' className="h-10 rounded-md p-2 shadow-md"/>
              <label htmlFor="email" className="mb-2 mt-4">Email Address</label>
              <input type="email" placeholder='Email' className="h-10 rounded-md p-2 shadow-md"/>
              <label htmlFor="password" className="mb-2 mt-4">Password</label>
              <input type="password" placeholder='Password' className="h-10 rounded-md p-2 shadow-md"/>
              <br />
              <button className='bg-cyan-800 text-orange-50 hover:bg-cyan-700 hover:shadow-lg p-1 px-5 w-full my-5 h-10'>Submit</button>
            </div>

            
        </form>
      </div>
    </div>
  )
}

export default Auth
