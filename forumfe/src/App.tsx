import { useContext, useEffect } from 'react';
import './App.css';
import Profile from './components/Profile/Profile/Profile'
import { UserContext } from './context/UserContext'
import { login } from './apis/users-apis'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import { PostContext } from './context/PostContext';

function App() {

  const context = useContext(UserContext)
  useEffect(() => {
    login()
      .then((user: User) => context.setUser(user))
      .catch(err => console.error(err))
  }, [])

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#F7F7FB' }}>
        <p>hello Minh meo, zo /profile de link den Profile nha</p>
        <Routes>
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/" element={<Navigate to="/home" />}> </Route>
          <Route path="/home" element={<Home />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
