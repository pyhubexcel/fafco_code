import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect } from 'react'
import cookie from 'react-cookies'

function App() {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   const token = cookie.load('token');
  //   if (!token) {
  //     navigate('/',{replace:true})
  //   }
  //   else{
  //     navigate('/home')
  //   }
  // },[])
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Header />
      <div className='bg-gray-200 flex justify-center'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
