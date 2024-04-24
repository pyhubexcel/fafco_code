import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Router from './router/Router'

function App() {
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Header />
      <div className='bg-gray-200 h-screen flex justify-center'>
        <Router/>
      </div>
      <Footer />
    </div>
  )
}

export default App
