import { useContext, useEffect } from 'react';
import './App.css';
import Profile from './components/Profile/Profile/Profile'
import { UserContext } from './context/UserContext'
import { login } from './apis/users-apis'

function App() {

  const context = useContext(UserContext)

  useEffect(() => {
    login()
      .then((user: User) => context.setUser(user))
      .catch(err => console.error(err))
  }, [])

  return (
    <div style={{ backgroundColor: '#c1c1c1' }}>
      <Profile />
    </div>
  );
}

export default App;
