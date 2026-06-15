import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routeContext } from '../contextAPI/RouteGuardContext'

function Pnf() {
    const {role,setRole,authorizedUser,setAuthorizedUser} = useContext(routeContext)
    const navigate = useNavigate()

    const backToHome =()=>{
      if(role=="user"){
        navigate("/")
      }else{
        navigate("/admin")
      }
    }
  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
        <img className='w-100' src="https://webytag.com/wp-content/uploads/2024/07/c19fc414b5c17a9e286bd53c5ab19e7c.gif" alt="Page not Found" />
        <p>Oh No!</p>
        <h3 className='text-2xl font-medium'>Look Like You're Lost</h3>
        <p>The page you are looking for is not available</p>
        <button onClick={backToHome} className='bg-black mt-5 px-3 py-2 text-white'>Home</button>
    </div>
  )
}

export default Pnf