import React from 'react'
import { FaArrowRight, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function Footer() {
  return (
    <>
    <div className='md:grid grid-cols-3 md:gap-10 bg-black text-white p-10'>
      <div>
        <h4 className='font-bold'>About US</h4>
        <p className='text-justify mt-5'>We believe books are more than just pages — they are windows into new worlds, teachers of wisdom, and companions for life. Our journey began with a passion for storytelling and a mission to make reading accessible, enjoyable, and inspiring for everyone.</p>
      </div>
      <div className='flex flex-col md:mt-0 mt-5'>
        <h4 className='font-bold'>NEWS LETTER</h4>
        <p className='my-5'>Stay updated with our latest trends</p>
        <div className='flex'>
          <input type="text" placeholder='E Mail' className='border p-2 bg-white text-black' />
          <button className='bg-yellow-500 p-2'> <FaArrowRight/> </button>
        </div>
      </div>
      <div className='flex flex-col md:mt-0 mt-5'>
          <h4 className='font-bold'>FOLLOW US</h4>
          <p className='my-5'>Let us be social</p>
          <div className='flex'>
            <FaFacebookF/>
            <FaInstagram className='mx-5'/>
            <FaXTwitter/>
            <FaEnvelope className='mx-5'/>
          </div>
      </div>
    </div>
    <p className='bg-black p-2 text-white text-center'>Copyright © 2026 All rights reserved | This website is made with ❤ By Luminar Technolab</p>
    </>
  )
}

export default Footer