import { useFormik } from 'formik';
import React,{useContext, useState} from 'react'
import {FaUser,FaEye, FaEyeSlash} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import  {googleLoginAPI, loginAPI, registerAPI} from "../services/allAPI"
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { routeContext } from '../contextAPI/RouteGuardContext';


function Auth({insideRegister}) {
  const {role,setRole,authorizedUser,setAuthorizedUser} = useContext(routeContext)
  const navigate = useNavigate()
  const [togglePassword,setTogglePassword] = useState(false)

  const formik = useFormik({
     initialValues: {
       username: 'Username',
       email: '',
       password: '',
     },
     validationSchema: Yup.object({
        username: Yup.string().min(3,"Must be atleast 3 charecter").required("Required"),
        email: Yup.string().email("Invalid Email").required("Required"),
        password: Yup.string().required("Required"),
     }),
     onSubmit: (values,{resetForm}) => {
       console.log(values);
       if(insideRegister){
        console.log("register API");
        handleRegister(values)
        
       }else{
        console.log("Login API");
        handleLogin(values)
       }
       resetForm()
       
     },
   });
 console.log(role);

  // LOgin
  const handleLogin = async (userData)=>{
    const result = await loginAPI(userData)
    console.log(result);
    if(result.status==200){
      toast.success("Login Successful!!")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
       setAuthorizedUser(true)
      setTimeout(()=>{
        if(result.data.user.role =="admin"){
          setRole("admin")
          navigate("/admin")
        }else{
          setRole("user")
          navigate("/")
        }
      },2500)
    }else{
      toast.error(result)
    }
  }

  // register
  const handleRegister = async (userData)=>{
    const response = await registerAPI(userData)
    console.log(response);
    if(response.status ==201){
      toast.success("Successfully Registered .. Please Login!!!")
    }else{
      toast.error(response)
    }
    navigate("/login")   
  }

  // google login
  const handleGoogleLogin = async(credentialResponse)=>{
    console.log("inside handlegooglelogin");
    console.log(credentialResponse);
    const {email,name,picture} = jwtDecode(credentialResponse.credential)
    console.log(email,name,picture);
    // api call
    const result = await googleLoginAPI({username:name,email,password:"googlePassword",picture})
    if(result.status==200){
      toast.success("Login Succcessful!!!")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setAuthorizedUser(true)
      setTimeout(()=>{
        if(result.data.user.role =="admin"){
          setRole("admin")
          navigate("/admin")
        }else{
          setRole("user")
          navigate("/")
        }
      },2500)
    }
  }
   
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[url(/landing.png)] bg-cover bg-center text-white'>
      <div className="p-10">
        <h1 className="text-center font-bold text-3xl">BOOK STORE</h1>
        <div style={{width:'400px'}} className='bg-black text-white p-5 flex justify-center items-center flex-col my-5'>
          <div style={{width:'80px',height:'80px',borderRadius:'50%'}} className="border mb-5 flex justify-center items-center">
            <FaUser className='text-3xl'/>
          </div>
          <h1 className='text-2xl'>{insideRegister ? " Register" :"Login"}</h1>


          <form onSubmit={formik.handleSubmit} className='my-5 w-full'>
            {/* username */}
            {
              insideRegister &&
              <>
                <input name='username' value={formik.values.username} onChange={formik.handleChange} className="bg-white p-2 w-full rounded my-5 text-black" type="text" placeholder="UserName"/>
                <div className='mb-3 text-yellow-400'>{formik.errors.username}</div>
              </>
            }
            {/* email */}
            <>
              <input  name='email' value={formik.values.email} onChange={formik.handleChange} className="bg-white p-2 w-full rounded my-5 text-black" type="text" placeholder="EMail"/>
              <div className='mb-3 text-yellow-400'>{formik.errors.email}</div>
            </>
            {/* password */}
            <div className="flex items-center">
              <input name='password' value={formik.values.password} onChange={formik.handleChange} className="bg-white p-2 w-full rounded my-5 text-black" type ={togglePassword ? "text":"password"} placeholder="Password"/>
              {
                togglePassword ?
                <FaEyeSlash onClick={()=>setTogglePassword(!togglePassword)} className='text-gray-500 cursor-pointer' style={{marginTop:'-10px', marginLeft:'-30px'}}/>
                :
                <FaEye onClick={()=>setTogglePassword(!togglePassword)} className='text-gray-500 cursor-pointer' style={{marginTop:'-10px', marginLeft:'-30px'}}/>
              }
            </div>
            <div className='mb-3 text-yellow-400'>{formik.errors.password}</div>
            {/* forgot password */}
            <div className="flex justify-between mb-5">
              <p className='text-xs text-orange-300'>*Never share your password with others</p>
              {
                !insideRegister &&
                  <button className="text-xs underline text-white">Forgot Password?</button>
              }
            </div>

            {/* reg/login button */}
            <div className="text-center">
              {
                insideRegister ?
                <button className="bg-green-700 p-2 w-full rounded">Register</button>
                :
                <button className="bg-green-700 p-2 w-full rounded">Login</button>
              }
            </div>

            {/* google Authentication */}
            {
              !insideRegister &&
              <div className="my-5 text-center">
                <p>------------------or---------------</p>
                <div className="mt-2 flex justify-center items-center w-full">
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      handleGoogleLogin(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
              </div>
            }
            {/* new user */}
            <div className="my-5 text-center">
              {
                insideRegister ?
                <p className="text-blue-500">Existing User ? <button type='submit'  className="underline ms-5">Login</button></p>
                :
                <p className="text-blue-500">New User ? <button type='submit' className="underline ms-5">Register</button></p>
              }
            </div>

          </form>
        </div>
      </div>

      {/* toster */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </div>
  )
}

export default Auth