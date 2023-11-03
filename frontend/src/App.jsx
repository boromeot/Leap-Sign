import { useEffect, useState } from 'react'
import { Route, Routes,useParams } from 'react-router-dom'
import * as sessionActions from "./store/session";
import { useDispatch } from 'react-redux'

import NavBar from './components/NavBar'
import HomePage from './pages/home'
import AboutPage from './pages/AboutPage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import LessonsPage from './pages/LessonsPage'
import SingleLesson from './pages/SingleLesson'
import Camera from './components/Camera';
import SecondLesson from './pages/SecondLesson';
import NotFoundPage from './pages/404'

import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
const { id } = useParams();
console.log(id,"ID FROM PARAMS")
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    isLoaded && (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} /> */}
        <Route path='/lessons' element={<LessonsPage />}/>
        <Route path='/lessons/1' element={<SingleLesson />}/>
        <Route path='/camera' element={<Camera />}/>
        <Route path= '/lessons/:id' element={<SingleLesson />}/>
        {/* <Route path= '/lessons/:id' element={<SecondLesson />}/> */}
        <Route path= '*' element={<NotFoundPage />} />
      </Routes>
    </>
    )
  )
}

export default App
