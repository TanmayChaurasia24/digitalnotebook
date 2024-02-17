import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Landing from './components/Landing';

function App() {
  const [mode,setmode] = useState('light');
  useEffect(()=>{
      if(mode === 'dark') {
        document.body.style.backgroundColor = '#041a3a';
      } else {
        document.body.style.backgroundColor = '';
      }
  },[mode]);

  const togglemode= ()=> {
    setmode(prevmode=>(
      prevmode === 'dark'?'light':'dark'
    ));
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} togglemode={togglemode}/>
      
          <div className="container">
            <Routes>
              
              <Route path="/" element={<Landing/>} />
              <Route path="/home" element={<Home mode={mode} togglemode={togglemode}/>} />
              <Route path="/about" element={<About />} />

              <Route path="/login" element={<Login mode={mode}/>} />
              <Route path="/signup" element={<Signup mode={mode}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;