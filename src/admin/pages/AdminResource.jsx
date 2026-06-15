import React, { useEffect, useState } from 'react'
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { bookListAPI, editBookAPI, userListAPI } from '../../services/allAPI'
import axiosInstance from '../../api/axiosInstance'
import { ToastContainer, toast } from 'react-toastify';


function AdminResource() {
    const [currentTab,setCurrentTab] = useState(1)
    const [allUsers,setAllUsers] = useState([])
    const [allBooks,setAllBooks] = useState([])


    useEffect(()=>{
      if(currentTab==2){
        getAllUsers()
      }else{
        getAllBooks()
      }
    },[currentTab])
    console.log(allBooks);
    


    const getAllBooks = async ()=>{
      const result = await bookListAPI()
      if(result.status==200){
        setAllBooks(result.data)
      }
    }

    const getAllUsers = async ()=>{
      const result = await userListAPI()
      if(result.status==200){
        setAllUsers(result.data)
      }
    }

    const updateBookStatus = async(id)=>{
      const result = await editBookAPI(id)
      if(result.status==200){
        toast.success("Book Approved....")
        getAllBooks()
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
        <h1 className='text-3xl font-bold text-center mb-10'>All Resources</h1>
         {/* tabs */}
        <div className='flex justify-center items-center my-8 font-medium text-lg'>
          <p onClick={()=>setCurrentTab(1)} className={currentTab==1 ? 'p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer' : 'p-4 border-gray-200 border-b rounded cursor-pointer' }>Books</p>
         
          <p onClick={()=>setCurrentTab(2)} className={currentTab==2 ? 'p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer' : 'p-4 border-gray-200 border-b rounded cursor-pointer' }>Users</p>

        </div>
        {/* tab content */}
          { currentTab==1 && 
             <div className='md:grid grid-cols-4 w-full my-10'>
                {/* duplicate according to book */}
                {
                  allBooks.length>0 ?
                  allBooks?.map(book=>(
                    <div key={book?._id} className='shadow rounded p-3 m-4 md:my-10'>
                      <img width={'100%'} height={'300px'} src={book?.imageURL} alt="book" />
                      <div className='flex flex-col justify-center items-center mt-4'>
                        <h2 className='text-blue-700 font-bold text-xl'>{book?.author}</h2>
                        <h3 className='text-lg'>{book?.title}</h3>
                        <p className='font-bold text-red-600'>${book?.discountPrice}</p>
                        {/* button */}
                        {
                          book?.status != "approved"?
                            <button onClick={()=>updateBookStatus(book?._id)} className='bg-green-600 text-white p-2 mt-2 w-full'>APPROVE</button>
                          :
                            <img width={'20%'} className='mt-2' src="https://static.vecteezy.com/system/resources/previews/017/177/781/non_2x/green-tick-check-mark-on-transparent-background-free-png.png" alt="" />
                        }
                  
                      </div>
                    </div>
                  ))
                  :
                  <div className='font-bold text-center text-xl'>Sorry!! No Books Uploaded Yet...</div>
                }
              </div>
          }
          { currentTab==2 && 
             <div className='md:grid grid-cols-4 w-full my-10'>
                {/* duplicate according to book */}
                {
                  allUsers.length>0?
                  allUsers?.map(user=>(
                    <div key={user._id} className='rounded bg-gray-200 p-2 m-2'>
                      <p className='text-red-500 font-bold text-md'>ID: {user?._id}</p>
                      <div className='flex mt-3 items-center'>
                          <img width={'80px'} height={'80px'} style={{borderRadius:'50%'}} src={user?.picture==""? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" : user?.picture.startsWith('https://lh3.googleusercontent.com/')?user?.picture :`${axiosInstance.defaults.baseURL}/uploads/${user?.picture}`} alt="User" />
                              <div className='flex flex-col ml-3 w-full'>
                                <h4 className='text-blue-700 font-bold text-md'>{user?.username}</h4>
                                <p className=' text-xs'>{user?.email}</p>
                              </div>
                      </div>
                      
                    </div>
                  ))
                  :
                  <div className='text-center text-xl font-bold'>Sorry!! No Users Registered Yet!!!</div>
                }
              </div>
          }
          
      </div>
    </div>

     {/* toster */}
              <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
  
    </>
  )
}

export default AdminResource