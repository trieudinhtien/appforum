import Login from './components/auth/Login/Login';
import { Register } from './components/auth/Register/Register';
import Header from './components/Header/Header';
import CreatePost from './components/CreatePost/CreatePost';
import MyPosts from './components/MyPosts/MyPosts';
import Profile from './components/Profile/Profile/Profile';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import UserProfile from './components/Profile/UserProfile/UserProfile'
import Post from './components/PostComponent/Post';
import { useContext, useEffect } from 'react'
import { PostContext } from './context/PostContext'
import { getPosts } from './apis/posts-apis';

function App() {
  const postContext = useContext(PostContext);
  useEffect(() => {
    getPosts()
      .then((data) => { postContext.setPosts(data) })
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/myposts/edit/:id" element={<CreatePost />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/profile" element={<Navigate to="/profile/about" />} />
        <Route path="/profile/settings" element={<Navigate to="/profile/settings/profile" />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id/*" element={<Post />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
