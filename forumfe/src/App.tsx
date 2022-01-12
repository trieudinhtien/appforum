import Login from './components/auth/Login/Login';
import { Register } from './components/auth/Register/Register';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import CreatePost from './components/CreatePost/CreatePost';
import MyPosts from './components/MyPosts/MyPosts';
import Profile from './components/Profile/Profile/Profile';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import UserProfile from './components/Profile/UserProfile/UserProfile'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}> </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/profile" element={<Navigate to="/profile/about" />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
