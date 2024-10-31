import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Footer from './Components/Footer';
import MentalHealth from './Pages/MentalHealth';


function App() {

  return (
    <>
    <MentalHealth/>
     <Router>
      <nav>
        <Link to="/">Footer</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Footer/>} />
        {/* You can add more routes here as needed this was hust an example of how you can route */}
      </Routes>
    </Router> 
      {/* <Footer/> */}
    </>
  )
}

export default App
