
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'

function App() {

  return (
    <BrowserRouter>
         <div> 
          <Toaster position='top-right'/> 
          <Routes path="/*">
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<RegisterPage/>}/>
            <Route path="/testing" element={<TestPage/>}/>

           <Route path="/admin/*" element={<AdminPage/>}/>

            <Route path='/*' element={<h1>404 Not Found</h1>}/>
          
          </Routes>

       

           
        </div>
    
    </BrowserRouter>
  )
}

export default App
