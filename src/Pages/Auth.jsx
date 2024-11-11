import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function Auth({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before login attempt

    try {
      // Attempt to login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      onLogin();
      navigate('/dashboard'); // Redirect to dashboard on successful login
      alert("Welcome back, " + userCredential.user.email);
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError("Login failed: " + error.message); // Display error to the user
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit} className="flex flex-col shadow-lg w-[500px] rounded-lg bg-stone-50 self-center">
          <h1 className='align-center rounded-t-lg h-16 pt-4 font-semibold text-2xl text-orange-50 bg-cyan-800 w-[500px]'>User Login Form</h1>
          <div className="flex flex-col p-4 text-left">
            <label htmlFor="email" className="mb-2 mt-4">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className="h-10 rounded-md p-2 shadow-md"
            />
            <label htmlFor="password" className="mb-2 mt-4">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className="h-10 rounded-md p-2 shadow-md"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <br />
            <p>Don't have an account? <span role="button" className="underline decoration-1 text-blue-300" onClick={() => navigate('/register')}>Register</span></p>
            <button className='bg-cyan-800 text-orange-50 hover:bg-cyan-700 hover:shadow-lg p-1 px-5 w-full my-5 h-10'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Auth.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Auth;
