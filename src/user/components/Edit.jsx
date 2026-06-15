import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaP, FaX } from 'react-icons/fa6'
import axiosInstance from '../../api/axiosInstance'
import { ToastContainer, toast } from 'react-toastify';
import { userEditAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';

  
function Edit() {
    const navigate = useNavigate()
    const [offCanvas,setOffCanvas] = useState(false)

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
        if(!username || !password || !cPassword || !bio){
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
             const result = await userEditAPI(id,reqBody)
             console.log(result);
             if(result.status==200){
                toast.success("User profile updates... Please Login!!")
                setTimeout(()=>{
                    sessionStorage.clear()
                    navigate("/login")
                },2500)
             }
             
        }
    }

  return (
    <div>
        {/* edit button */}
        <button onClick={()=>setOffCanvas(true)} className='bg-blue-700 text-white p-2 flex items-center rounded border hover:bg-white hover:text-blue-700'><FaPen className='me-2'/> Edit</button>

        {/* offcanvas */}
        {
            offCanvas &&
                <div>
                   <div className='fixed inset-0 bg-gray-500/75 w-full h-full'></div>
                   <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
                    {/* head */}
                    <div className='bg-black text-white px-3 py-4 flex justify-between text-2xl'>
                        <h1>Update User Profile</h1>
                        <FaX onClick={()=>setOffCanvas(false)}/>
                    </div>
                    {/* body */}
                    <div className='flex justify-center items-center flex-col my-5'>
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

                            <button className='bg-black text-white px-3 py-2 rounded z-53 fixed' style={{marginLeft:"50px",marginTop:"-15px"}}> <FaPen/> </button>
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
                         <div className='mt-10 mb-2 w-full px-3'>
                            <input value={userDetails?.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} type="text" placeholder='New Password' className='w-full border border-gray-300 rounded p-2' />
                        </div>
                        {/* confirm password */}
                         <div className='mt-10 mb-2 w-full px-3'>
                            <input value={userDetails?.cPassword} onChange={e=>checkPasswordMatch(e.target.value)} type="text" placeholder='Confirm password' className='w-full border border-gray-300 rounded p-2' />
                        </div>

                        {
                            !passwordMatch && 
                            <div className='mb-3 text-yellow-500 text-sm'>*Password and confirm password must be same</div>
                        }


                        {/* bio */}
                         <div className='mt-10 mb-2 w-full px-3'>
                            <input value={userDetails?.bio} onChange={e=>setUserDetails({...userDetails,bio:e.target.value})} type="text" placeholder='Bio' className='w-full border border-gray-300 rounded p-2' />
                        </div>
                        {/* buttons */}
                        <div className='flex justify-end w-full px-5 mt-5'>
                            <button onClick={resetProfile} className='bg-yellow-600 text-white py-2 px-3 rounded'>RESET</button>
                            <button onClick={handleUserUpdate} className='bg-green-600 text-white py-2 px-3 rounded ms-2'>UPDATE</button>                        
                        </div>
                    </div>

                   </div>
                </div>
        }

         {/* toster */}
              <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default Edit