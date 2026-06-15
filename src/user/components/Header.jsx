import React, { useContext, useEffect, useState } from 'react'
import { FaBars, FaFacebookSquare, FaInstagram, FaPowerOff, FaUser } from 'react-icons/fa'
import { FaGear, FaXTwitter } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { routeContext } from '../../contextAPI/RouteGuardContext'

function Header() {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [token,setToken] =useState("")
  const [dp,setDp] = useState("")
  const [userId, setUserId] = useState("")
  const [dropDown, setDropdown] = useState(false)
  const {role,setRole,authorizedUser,setAuthorizedUser} = useContext(routeContext)
  

  useEffect(()=>{
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      const userToken = sessionStorage.getItem("token")
      const user = JSON.parse(sessionStorage.getItem("user"))
      setToken(userToken)
      setDp(user?.picture)
      setUserId(user?._id)
    }
  },[token])

  const logout =()=>{
    sessionStorage.clear()
    setAuthorizedUser(false)
    setToggle(false)
    setToken("")
    setDp("")
    setUserId("")
    setDropdown(false)
    navigate("/")
  }


  return (
    <>
      {/* Header top part */}
      <div className='grid grid-cols-3 p-3'>
        {/* logo */}
          <div className='flex items-center'>
            <img width={'50px'} height={'50px'} src="https://png.pngtree.com/png-clipart/20231021/original/pngtree-watercolor-library-book-clip-art-png-image_13391689.png" alt="Logo" />
            <h1 className='text-2xl font-bold ms-2 md:hidden'>BOOKSTORE</h1>
          </div>
          {/* title */}
          <div className='md:flex justify-center items-center hidden'>
             <h1 className='text-3xl font-bold '>BOOKSTORE</h1>
          </div>
          {/* login */}
          <div className='md:flex items-center justify-end hidden'>
            <FaInstagram/>
            <FaXTwitter className='mx-1'/>
            <FaFacebookSquare/>
            {/* login link / profile icon block */}
            { !token ?
              <Link to={'/login'} className='border border-black rounded px-3 py-2 ms-3 flex items-center hover:bg-black hover:text-white'><FaUser className='me-1'/>Login</Link>
              :
              <div>
                {/* profile icon */}
                <button onClick={()=>setDropdown(!dropDown)} className='shadow-sm rounded ms-5 p-1 hover:bg-gray-100'>
                  <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} src={dp==""? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" : dp.startsWith('https://lh3.googleusercontent.com/')?dp :`${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="ProfileIcon" />
                </button>
                {/* dropdown */}
                { dropDown &&
                  <div className='absolute right-0 z-10 mt-2 w-40 bg-white shadow rounded ring-1 ring-black/5 p-2 focus:outline-hidden'>
                  {/* profile link */}
                  <Link to={`/profile/${userId}`} className='flex items-center text-sm px-3 py-2'> <FaGear className='me-1'/> Profile</Link>
                  {/* logout button */}
                  <button onClick={logout} className='flex items-center text-sm px-3 py-2'><FaPowerOff className='me-1'/> Logout</button>
                </div>}
              </div>
            }
          </div>
      </div>
      {/* navigation */}
      <nav className='bg-black w-full p-3 text-white md:flex justify-center items-center'>
        {/* menu and login in small screen */}
        <div className='flex justify-between items-center text-2xl md:hidden'>
          <button onClick={()=>setToggle(!toggle)}> <FaBars/> </button>
           {/* login link / profile icon block */}
            { !token ?
              <Link to={'/login'} className='border border-black rounded px-3 py-2 ms-3 flex items-center hover:bg-black hover:text-white'><FaUser className='me-1'/>Login</Link>
              :
              <div>
                {/* profile icon */}
                <button onClick={()=>setDropdown(!dropDown)} className='shadow-sm rounded ms-5 p-1 hover:bg-gray-100'>
                  <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} src={dp==""? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" : dp} alt="ProfileIcon" />
                </button>
                {/* dropdown */}
                { dropDown &&
                  <div className='absolute right-0 z-10 mt-2 w-40 bg-white text-black shadow rounded ring-1 ring-black/5 p-2 focus:outline-hidden'>
                  {/* profile link */}
                  <Link to={`/profile/${userId}`} className='flex items-center text-sm px-3 py-2'> <FaGear className='me-1'/> Profile</Link>
                  {/* logout button */}
                  <button onClick={logout} className='flex items-center text-sm px-3 py-2'><FaPowerOff className='me-1'/> Logout</button>
                </div>}
              </div>
            }
        </div>
       
        <ul className={toggle ? 'flex flex-col' : 'md:flex hidden'}>
          <li><Link to={'/'} className='md:mx-4 mt-2 md:mt-0'>HOME</Link></li>
          <li><Link to={'/books'} className='md:mx-4 mt-2 md:mt-0'>BOOKS</Link></li>
          <li><Link to={'/contact'} className='md:mx-4 mt-2 md:mt-0'>CONTACT</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Header