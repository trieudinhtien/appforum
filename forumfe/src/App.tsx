import { useContext, useEffect } from 'react';
import './App.css';
import Profile from './components/Profile/Profile/Profile'
import { UserContext } from './context/UserContext'
import { login } from './apis/users-apis'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        <Routes>
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
