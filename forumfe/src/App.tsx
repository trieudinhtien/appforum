import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import CreatePost from './components/CreatePost/CreatePost';
import MyPosts from './components/MyPosts/MyPosts';

function App() {
  // useEffect(() => {
  //   axios.
  // }, []);
  return (
    <BrowserRouter>
      <Header/>
      <Navigation/>
      <Routes>
        <Route path="/createpost" element={<CreatePost/>}/>
        <Route path="/myposts" element={<MyPosts/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
