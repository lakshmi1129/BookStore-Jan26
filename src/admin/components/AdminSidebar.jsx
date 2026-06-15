import React, { useEffect, useState } from 'react'
import { FaDatabase } from 'react-icons/fa'
import { FaChartSimple, FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'

function AdminSidebar() {

   const [userName,setuserName] = useState("")
   const [dp,setDp] = useState("")

   useEffect(()=>{
         if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
           const user = JSON.parse(sessionStorage.getItem("user"))
           setDp(user?.picture)
           setuserName(user?.username)
         }
       },[])

  return (
    <div className='bg-blue-100 md:min-h-screen h-fit py-10'>
        <div className='flex justify-center'>
          <img style={{width:'100px',height:'100px',borderRadius:'50%'}} className='border border-gray-300 z-52' src={dp==""? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" : dp.startsWith('https://lh3.googleusercontent.com/')?dp :`${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="User" />
        </div>
        {/* name */}
        <h3 className='text-xl font-bold my-5 text-center'>{userName}</h3>
        {/* links */}
        <div className='mt-10 flex flex-col justify-center items-center'>
          <div className='mt-3'>
            <Link to={'/admin'} className='flex items-center'> <FaChartSimple className='me-2'/> Dashboard</Link>
          </div>
           <div className='mt-3'>
            <Link to={'/admin/resources'} className='flex items-center'> <FaDatabase className='me-2'/> Collections</Link>
          </div>
           <div className='mt-3'>
            <Link to={'/admin/settings'} className='flex items-center'> <FaGear className='me-2'/> Settings</Link>
          </div>
        </div>
       
    </div>
  )
}

export default AdminSidebar