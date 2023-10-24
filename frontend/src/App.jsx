import { Route, Routes } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/home'
import AboutPage from './pages/AboutPage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import LessonsPage from './pages/LessonsPage'
import SingleLesson from './pages/SingleLesson'
import Camera from './components/Camera';
import SecondLesson from './pages/SecondLesson'
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/lessons' element={<LessonsPage />}/>
        <Route path='/lessons/1' element={<SingleLesson />}/>
        <Route path='/camera' element={<Camera />}/>
        <Route path= '/lessons/:id' element={<SingleLesson />}/>
        <Route path= '/lessons/:id' element={<SecondLesson />}/>
      </Routes>
    </>
  )
}

export default App
