
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./user/pages/Home"
import Contact from "./user/pages/Contact"
import Books from "./user/pages/Books"
import Profile from "./user/pages/Profile"
import View from "./user/pages/View"

import AdminDashboard from "./admin/pages/AdminDashboard"
import AdminResource from "./admin/pages/AdminResource"
import AdminSettings from "./admin/pages/AdminSettings"

import Auth from "./pages/Auth"
import Pnf from "./pages/Pnf"

import Preloader from "./components/Preloader"
import Footer from "./components/Footer"
import { useContext, useState } from 'react'
import PaymentSuccess from './user/pages/PaymentSuccess'
import PaymentFail from './user/pages/PaymentFail'
import { routeContext } from './contextAPI/RouteGuardContext'



function App() {

  const [isLoading,setIsLoading] = useState(true)
  const {role} = useContext(routeContext)

  setTimeout(()=>{
    setIsLoading(false)
  },6000);

  return (
    <>
      <Routes>
        <Route path='/' element={isLoading ? <Preloader/> : <Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth  insideRegister/>}/>

        {
          role=="user" &&
            <>
              <Route path='/profile/:id' element={<Profile/>}/>
              <Route path='/books/:id' element={<View/>}/>
              <Route path='/success' element={<PaymentSuccess/>}/>
              <Route path='/cancel' element={<PaymentFail/>}/>
            </>
        }

        { role=="admin" &&
          <>
              <Route path='/admin' element={isLoading ? <Preloader/> : <AdminDashboard/>}/>
              <Route path='/admin/resources' element={<AdminResource/>}/>
              <Route path='/admin/settings' element={<AdminSettings/>}/>
          </>
        }

        <Route path='/*' element={<Pnf/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
