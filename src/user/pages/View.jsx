import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaBackward, FaCamera, FaEye } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { buyBookAPI, viewBookAPI } from '../../services/allAPI'
import axiosInstance from '../../api/axiosInstance'
import {loadStripe} from '@stripe/stripe-js';

function View() {
  const [modal,setModal] = useState(false)
  const {id} = useParams()
  const [bookDetails,setBookDetails] = useState({})
  console.log(bookDetails);

  useEffect(()=>{
    getBookDetails()
  },[])

  const getBookDetails = async ()=>{
    const result = await viewBookAPI(id)
    setBookDetails(result.data)
  }
  // console.log(bookDetails);

  const makePayment = async()=>{
    // console.log(import.meta.env.VITE_STRIPE_PK); 
    // load stripe
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    // console.log(stripe);
    // api call
    const result = await buyBookAPI(id)
    const {checkOutURL} = result.data
    window.location.href =checkOutURL   
  }



  
  
  return (
    <>
      <Header/>
      <div className='md:m-10 m-5'>
        <div className='border p-5 shadow border-gray-200'>
          <div className='md:grid grid-cols-4 gap-x-10'>
            {/* image */}
            <div className='col-span-1'>
              <img className='w-full' src={bookDetails?.imageURL} alt="Book" />
            </div>
             {/* book details */}
            <div className='col-span-3'>
              <div className='flex justify-between mt-5 md:mt-0'>
                  <h3 className='text-2xl font-bold'>{bookDetails?.title}</h3>
                  <button onClick={()=>setModal(true)} className='text-gray-400'><FaEye/></button>
              </div>
              <h2 className='text-blue-700 font-bold text-xl my-5'>{bookDetails?.author}</h2>
              <div className='md:grid grid-cols-3 gap-5 my-10'>
                <p className='font-bold'>Publisher :{bookDetails?.publisher} </p>
                <p className='font-bold'>Language :{bookDetails?.language} </p>
                <p className='font-bold'>No.Of pages :{bookDetails?.pages} </p>
                <p className='font-bold'>Category :{bookDetails?.category} </p>
                <p className='font-bold'>ISBN :{bookDetails?.isbn} </p>
                <p className='font-bold'>Original Price : {bookDetails?.price}</p>
                <p className='font-bold'>Seller : {bookDetails?.sellerMail} </p>
              </div>
              <div className='md:my-10 my-4'>
                <p className='font-bold text-lg'>Abstract :{bookDetails?.abstract} </p>
              </div>
              <div className='flex justify-end'>
                <Link to={'/books'} className='bg-blue-800 text-white p-2 font-black flex items-center'> <FaBackward className='me-2'/> Back</Link>
                <button onClick={makePayment} className='bg-green-800 text-white p-2 font-black ms-5'>Buy ${bookDetails?.discountPrice}</button>
              </div>
            </div>
           
          </div>

        </div>

        {/* modal */}
        { modal &&
          <div className='relative z-10 overflow-y-auto' onClick={()=>setModal(false)}>
            <div className='bg-gray-500/75 fixed inset-0'>
              <div className='flex justify-center items-center min-h-screen'>
                <div className='bg-white rounded-2xl md:w-250 w-100'>
                  {/* modal-title */}
                  <div className='bg-black text-white p-3'>
                    <h3>Book Images</h3>
                  </div>
                  {/* modal body */}
                  <div className='relative p-5'>
                      <p className='text-blue-700 flex items-center'><FaCamera className='me-2'/>Camera click of the book in the hand of seller</p>
                      <div className='md:flex flex-wrap my-4'>
                        {/* duplicate image */}
                        {
                          bookDetails?.uploadedImages?.length>0 ?
                          bookDetails?.uploadedImages?.map(filename=>(
                             <img className='md:w-75 w-25 md:me-2 mb-3 md:mt-0' src={`${axiosInstance.defaults.baseURL}/uploads/${filename}`} alt="book" />
                          ))
                          :
                          <div className='text-xl text-red-700'>Images not Available</div>
                        }
                      </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }
      </div>
    </>
  )
}

export default View