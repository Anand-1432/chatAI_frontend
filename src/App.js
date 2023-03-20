import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { requestGallery } from './actions/galleryAction'
import Chat from './pages/chat/Chat'
import Gallery from './pages/gallery/Gallery'
import Home from './pages/home/Home'
import ImageGenerator from './pages/imageGenerator/ImageGenerator'

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestGallery());
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/image_generation' element={<ImageGenerator />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
    </>
  )
}

export default App