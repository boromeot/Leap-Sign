import { useEffect, useState } from 'react'
import { Route, Routes,useParams } from 'react-router-dom'
import * as sessionActions from "./store/session";
import { useDispatch } from 'react-redux'

import NavBar from './components/NavBar'
import HomePage from './pages/home'
import AboutPage from './pages/AboutPage'
import LessonsPage from './pages/LessonsPage'
import SingleLesson from './pages/SingleLesson'
import Camera from './components/Camera';
import NotFoundPage from './pages/404'

import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
const { id } = useParams();
// console.log(id,"ID FROM PARAMS");
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    isLoaded && (
    <>
      <NavBar />
      <Routes>
        <Route exact={true} path="/" element={<HomePage />} />
        <Route exact={true} path="/about" element={<AboutPage />} />
        <Route exact={true} path='/lessons' element={<LessonsPage />}/>
        <Route exact={true} path='/camera' element={<Camera />}/>
        <Route exact={true} path= '/lessons/:id' element={<SingleLesson />}/> 
        <Route path= '*' element={<NotFoundPage />} />
      </Routes>
    </>
    )
  )
}

export default App
