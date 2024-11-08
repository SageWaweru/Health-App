import { useState } from "react"
import PropTypes from "prop-types";
// import { signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,sendEmailVerification } from "firebase/auth"
import {auth} from '../firebase-config'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function Auth({onLogin}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted',{email, password})
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      onLogin()
      navigate('/dashboard')
      alert("User registered:", userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert("Registered failed:"+ error.message);
    }
   
  };

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });
  return (
    <div>
      <div className='flex justify-center'>
        <form action=""  onClick = {handleSubmit} className="flex flex-col shadow-lg w-[500px] rounded-lg bg-stone-50 self-center">
            <h1 className='align-center rounded-t-lg h-16 pt-4 font-semibold text-2xl text-orange-50 bg-cyan-800 w-[500px]'>User Registration Form</h1>
            <div className="flex flex-col p-4 text-left ">
              <label htmlFor="name"  className="mb-2 mt-4">Name</label>
              <input type="text"  value={name} onChange= {(e)=>setName (e.target.value)} placeholder='Full Name' className="h-10 rounded-md p-2 shadow-md"/>
              <label htmlFor="email"  className="mb-2 mt-4">Email Address</label>
              <input type="email" value={email} onChange= {(e)=>setEmail (e.target.value)} placeholder='Email' className="h-10 rounded-md p-2 shadow-md"/>
              <label htmlFor="password" className="mb-2 mt-4">Password</label>
              <input type="password"  value={password} onChange= {(e)=>setPassword (e.target.value)} placeholder='Password' className="h-10 rounded-md p-2 shadow-md"/>
              <br />
              <button className='bg-cyan-800 text-orange-50 hover:bg-cyan-700 hover:shadow-lg p-1 px-5 w-full my-5 h-10'>Submit</button>
            </div>


            
        </form>
      </div>
    </div>
  )
}
Auth.proptypes-{
  onLogin: PropTypes.func.isRequired,
};

export default Auth
