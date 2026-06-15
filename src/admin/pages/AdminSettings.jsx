import React, { useEffect, useState } from 'react'
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { FaPen } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { adminEditAPI } from '../../services/allAPI';



function AdminSettings() {

  const navigate = useNavigate()
   const [userDetails,setUserDetails] = useState({username:"",password:"",cPassword:"",picture:"",bio:"",role:"",id:""})
  const [existingPicture,setExistingPicture] = useState("")
  const [preview,setPreview] = useState("")
  const [passwordMatch,setPasswordMatch] = useState(true)
  const [imageFileType,setImageFileType] = useState(false)

   useEffect(()=>{
          if(sessionStorage.getItem("user")){
              const user = JSON.parse(sessionStorage.getItem("user"))
              setUserDetails({...userDetails,username:user.username, role:user.role, bio:user.bio, id:user._id,})
              setExistingPicture(user.picture)
          }
      },[])
  
      console.log(userDetails);
      // console.log(existingPicture);
  
  
      const handleFileUpload=(e)=>{
          //  console.log(e.target.files[0]);
          const imageFile = e.target.files[0]
          if(imageFile.type.startsWith("image/")){
              setUserDetails({...userDetails,picture:e.target.files[0]})
              const url = URL.createObjectURL(e.target.files[0])
              setPreview(url)
              setImageFileType(true)
          }else{
              setImageFileType(false)
          }   
      }
  
      const checkPasswordMatch =(data)=>{
          setUserDetails({...userDetails,cPassword:data})
          userDetails.password == data? setPasswordMatch(true) :setPasswordMatch(false)
      }
  
      const resetProfile =()=>{
          const user = JSON.parse(sessionStorage.getItem("user"))
          setUserDetails({username:user.username, role:user.role, bio:user.bio, id:user._id,password:"",cPassword:"",picture:""})
          setExistingPicture(user.picture)
          setPreview("")
          setImageFileType(false)
          setPasswordMatch(true)
      }

      const handleUserUpdate= async ()=>{
          const {username,password,picture,bio,id,cPassword} = userDetails
          if(!username || !password || !cPassword ){
              toast.info("Please fill the form completly!!!")
          }else if(passwordMatch){
              const reqBody = new FormData()
              for(let key in userDetails){
                  if(key !="picture"){
                    reqBody.append(key,userDetails[key])
                  }else{
                      preview ? reqBody.append("picture",picture) : reqBody.append("picture",existingPicture)
                  }
              }
                // api call
                const result = await adminEditAPI(id,reqBody)
                console.log(result);
                if(result.status==200){
                  toast.success("Admin profile updated... Please Login!!")
                  setTimeout(()=>{
                      sessionStorage.clear()
                      navigate("/login")
                  },2500)
                }
                
          }
      }


  return (
    <>
    <AdminHeader/>
    <div className='md:grid grid-cols-5 gap-2'>
      <div className='col-span-1'>
        <AdminSidebar/>
      </div>
      <div className='col-span-4 p-10'>
          <h1 className='text-3xl font-bold text-center mb-10'>Settings</h1>
          <div className='md:grid grid-cols-2 items-center'>
            <div>
              <h2 className='text-xl mb-5'>Welcome, Admin 👋</h2>
              <p className='text-justify'>This is your personal administration space where you can manage your account details, system preferences, and platform roles with ease. From here, you can update essential information such as your username, password, contact details, and notification preferences — ensuring your access remains secure and personalized.</p>

              <h4 className='text-lg my-5'>🔧 What You Can Manage in This Section:</h4>

              <ul>
                <li>✏️ Update personal details (name, email, role, profile picture)</li>
                <li>🔐 Change or reset your password</li>
                <li>📢 Configure notification and alert preferences</li>
                <li>👥 Manage permissions based on assigned access level</li>
                <li>🧩 Customize dashboard visibility and layout</li>
              </ul>
              <p className='my-5 text-justify'>Your profile settings help ensure your administrative tools work the way you need them to — securely, efficiently, and with complete control. Thank you for keeping the platform organized and running smoothly. Continue managing, updating, and improving the system — one step at a time. 🚀📚</p>
            </div>
            {/* form */}
            <div className='flex justify-center items-center flex-col m-10 bg-blue-100 p-5 rounded'>
                <label htmlFor="userProfile">
                    <input onChange={e=>handleFileUpload(e)} type="file" id='userProfile' hidden />
                     { existingPicture=="" ?
                            <img style={{width:"100px",height:"100px",borderRadius:'50%'}} src={preview?preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOOOp7Ae6JdqU8o-6BLyjvrep4SEd8mfKx2w&s"} alt="userprofile" /> 
                            :
                            existingPicture.startsWith("https://lh3.googleusercontent.com/")?
                            <img style={{width:"100px",height:"100px",borderRadius:'50%'}} src={preview?preview : existingPicture} alt="userprofile" />
                            :
                            <img style={{width:"100px",height:"100px",borderRadius:'50%'}} src={preview?preview : `${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`} alt="userprofile" />
                        }

                    <button className='bg-black text-white px-3 py-2 rounded z-53 ' style={{marginLeft:"50px",marginTop:"-15px"}}> <FaPen/> </button>
                </label>
                {
                  !imageFileType && 
                  <div className='mt-5 text-yellow-500 text-sm'>
                      *Only Accepts image file
                  </div>
                }
                {/* username */}
                <div className='mt-10 mb-2 w-full px-3'>
                    <input value={userDetails?.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder='Username' className='w-full border border-gray-300 rounded p-2' />
                </div>
                {/* new password */}
                  <div className=' mb-2 w-full px-3'>
                    <input value={userDetails?.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} type="text" placeholder='New Password' className='w-full border border-gray-300 rounded p-2' />
                </div>
                {/* confirm password */}
                  <div className=' mb-2 w-full px-3'>
                    <input value={userDetails?.cPassword} onChange={e=>checkPasswordMatch(e.target.value)} type="text" placeholder='Confirm password' className='w-full border border-gray-300 rounded p-2' />
                </div>

                 {
                      !passwordMatch && 
                      <div className='mb-3 text-yellow-500 text-sm'>*Password and confirm password must be same</div>
                  }
                
                {/* buttons */}
                <div className='flex justify-end w-full px-5 mt-5'>
                    <button onClick={resetProfile} className='bg-yellow-600 text-white py-2 px-3 rounded'>RESET</button>
                    <button onClick={handleUserUpdate} className='bg-green-600 text-white py-2 px-3 rounded ms-2'>UPDATE</button>                        
                </div>
            </div>
          </div>
      </div>
    </div>
     {/* toster */}
          <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
  
    </>
  )
}

export default AdminSettings