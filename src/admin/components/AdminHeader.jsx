import React, { useContext } from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { routeContext } from '../../contextAPI/RouteGuardContext'

function AdminHeader() {

  const navigate = useNavigate()
  const {role,setRole,authorizedUser,setAuthorizedUser} = useContext(routeContext)
  

  const logout = ()=>{
    sessionStorage.clear()
    setAuthorizedUser(false)
    navigate("/")
  }
  
  return (
    <>
    {/* header top */}
    <div className='flex justify-between items-center p-3 md:px-20'>
      {/* logo */}
      <div className='flex items-center'>
            <img width={'50px'} height={'50px'} src="https://png.pngtree.com/png-clipart/20231021/original/pngtree-watercolor-library-book-clip-art-png-image_13391689.png" alt="Logo" />
            <h1 className='text-2xl font-bold ms-2'>BOOKSTORE</h1>
      </div>
      {/* logout */}
      <button onClick={logout} className='flex items-center px-3 py-2 bg-black text-white rounded border border-black hover:bg-white hover:text-black'>LogOut <FaPowerOff className='ms-2'/></button>
    </div>
    {/* header marquee */}
    <div className='w-full p-3 bg-black text-white'>
        <marquee >Welcome Admin, Your all set to manage and monitor the system. Let's get into work!!!</marquee>
    </div>
    </>
  )
}

export default AdminHeader