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
import { useContext, useEffect } from "react";
import { PostContext } from "./context/PostContext";
import { getPosts } from "./apis/posts-apis";
import MyPostDetail from "./components/MyPosts/MyPostDetail/MyPostDetail";

function App() {
  const postContext = useContext(PostContext);

  useEffect(() => {
    getPosts()
      .then((data) => {postContext.setPosts(data)})
      .catch((err: Error) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/profile" element={<Navigate to="/profile/about" />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/myposts/:id" element={<MyPostDetail />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      
      
    </BrowserRouter>
  )
}

export default App;
