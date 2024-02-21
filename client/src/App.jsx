import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/profile'
import Home from './pages/Home'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
   <BrowserRouter>
   <Header></Header>
     <Routes>
      
         <Route exact  path='/' element={<Home/>} />
         <Route path='/Signin' element={<Signin/>} />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/about" element={<About/>} />
         <Route element={<PrivateRoute/>} >
         <Route path="/profile" element={<Profile/>} />
</Route>
     </Routes>
   </BrowserRouter>
  // <Home></Home>
  
  )
}
