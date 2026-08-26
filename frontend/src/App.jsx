import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Report from './components/Report'
import Test from './components/Test'


const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage/>
  },
  {
    path:'/register',
    element: <Signup/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:"*",
    element: <Report/>
  },
  {
    path:"/test",
    element: <Test/>
  }
])
const App = () => {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router}/>
      
    </div>
  )
}

export default App