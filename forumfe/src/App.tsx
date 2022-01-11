import { useContext, useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import CreatePost from './components/CreatePost/CreatePost';
import MyPosts from './components/MyPosts/MyPosts';
import Profile from './components/Profile/Profile/Profile';
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
      <Header/>
      <Navigation/>
      <Routes>
         <Route path="/" element={<Navigate to="/home" />}> </Route>
          <Route path="/home" element={<Home />} />
        <Route path="/createpost" element={<CreatePost/>}/>
        <Route path="/myposts" element={<MyPosts/>}/>
        <Route path="/profile/*" element={<Profile />} />
      </Routes>
      <Footer/>
      </BrowserRouter>

  )}

export default App;
