
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Create from './components/pages/Create';
import View from './components/pages/View';
import { AuthContext, FirebaseContext } from './components/store/Context';
import { useContext, useEffect } from 'react';
import Post from './components/store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext)
  const {auth} = useContext(FirebaseContext)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
  },[])
  return (
    <Post>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<Create />} />
        <Route path='/view' element={<View />} />
      </Routes>
    </Router>
    </Post>
  );
}

export default App;
