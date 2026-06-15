import React from 'react'
import Header from '../components/Header'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <>
    <Header/>
    <div className='container min-h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
            <div>
                <h1 className='text-blue-500 md:text-4xl font-bold'>Congratulations!!!</h1>
                <p className='text-2xl my-10'>Thank You for the Purchase.. Hope You have a good Time with us....</p>
                <Link to={'/books'} className='flex items-center bg-blue-700 w-60 p-2 text-white font-bold'> <FaBackward className='me-2'/>Explore More Books....</Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://funtura.in/tvm/wp-content/themes/funtura/assets/images/success.svg" alt="Payment Success" />
            </div>
        </div>
    </div>
    </>
  )
}

export default PaymentSuccess