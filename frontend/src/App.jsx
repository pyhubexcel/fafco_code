import Header from './components/Header'
import Footer from './components/Footer'
import Router from './router/Router'

function App() {
  return (
    <div className='bg-gray-100 flex flex-col justify-between min-h-screen'>
      <Header />
      <div className='flex justify-center'>
        <Router/>
      </div>
      <Footer />
      
    </div>
  )
}

export default App
