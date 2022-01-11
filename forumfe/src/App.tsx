import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import CreatePost from './components/CreatePost/CreatePost';
import MyPosts from './components/MyPosts/MyPosts';
import Profile from './components/Profile/Profile/Profile';
import { UserContext } from './context/UserContext'
import { login } from './apis/users-apis'

function App() {
  const context = useContext(UserContext);

  useEffect(() => {
    login()
      .then((user: User) => context.setUser(user))
      .catch(err => console.error(err))
  }, [])
  return (
    <BrowserRouter>
      <Header/>
      <Navigation/>
      <Routes>
        <Route path="/createpost" element={<CreatePost/>}/>
        <Route path="/myposts" element={<MyPosts/>}/>
        <Route path="/profile/*" element={<Profile />} />
      </Routes>
      <Footer/>
      </BrowserRouter>

  )}

export default App;
