import React from 'react'
import {  Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App