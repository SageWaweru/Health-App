function Auth() {
  return (
    <div>
      Auth
      <div className='content-center p-10 bg-emerald-200 m-10 rounded-lg w-[500px]'>
        <form action="">
            <h1 className='align-center font-bold'>Registration form</h1>
            <h4>Login</h4>
            <input type="text" placeholder='Full Name' className='w-full my-5 p-1 text-center rounded-xl'/>
            <br />
            <input type="email" placeholder='email' className='w-full my-5 p-1 text-center rounded-xl' />
            <br />
            <input type="password" placeholder='password' className='w-full my-5 p-1 text-center rounded-xl' />
            <br />
            <button className='bg-orange-300 p-1 px-5 w-full my-5'>submit</button>

            
        </form>
      </div>
    </div>
  )
}

export default Auth
