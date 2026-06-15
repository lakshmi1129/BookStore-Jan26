import React from 'react'
import Header from '../components/Header'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function PaymentFail() {
  return (
     <>
    <Header/>
    <div className='container min-h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
            <div>
                <h1 className='text-blue-500 md:text-4xl font-bold'>Sorry!! Payment Failed..!!!</h1>
                <p className='text-2xl my-10'>We Apologize for the inconvience caused.......</p>
                <Link to={'/books'} className='flex items-center bg-blue-700 w-60 p-2 text-white font-bold'> <FaBackward className='me-2'/>Explore More Books....</Link>
            </div>
            <div className='flex justify-center items-center'>
                <img width={'400px'} src="https://static.vecteezy.com/system/resources/previews/070/294/402/non_2x/mobile-payment-failure-with-transparent-background-3d-illustration-of-unsuccessful-transaction-png.png" alt="Payment Failed" />
            </div>
        </div>
    </div>
    </>
  )
}

export default PaymentFail