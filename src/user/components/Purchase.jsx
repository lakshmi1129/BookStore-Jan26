import React, { useEffect, useState } from 'react'
import { getBroughtBooksAPI } from '../../services/allAPI'

function Purchase() {
    const [broughtBooks,setBroughtBooks] =useState([])
        // console.log(uploadBooks);
    
        useEffect(()=>{
            getUserBroughtBooks()
        },[])
    
        const getUserBroughtBooks =async()=>{
            const result = await getBroughtBooksAPI()
            // console.log(result); 
            setBroughtBooks(result.data)
        }
  return (
    <div className='p-10 my-15 shadow rounded'>
        {/* duplicate Purchased books */}
        {
            broughtBooks.length>0?
            broughtBooks?.map(book=>(
                <div className='p-5 rounded pt-4 bg-gray-100'>
                    <div className='md:grid grid-cols-[3fr_1fr]'>
                        <div className='px-4'>
                            <h1 className='text-2xl'>{book?.title}</h1>
                            <h2 className='text-xl'>{book?.author}</h2>
                            <h3 className='text-lg text-blue-500'>$ {book?.discountPrice}</h3>
                            <p className='text-justify'>{book?.abstract}</p>
                            {/* status image- */}
                            <div className='flex mt-3'>
                                <img width={'120px'} height={'120px'} src="https://static.vecteezy.com/system/resources/previews/023/629/698/non_2x/web-button-icon-purchase-button-free-png.png" alt="Purchase" />
                            </div>
                        </div>
                        <div className='px-4 mt-4 md:mt-0'>
                            <img className='w-full' src={book?.imageURL} alt="Book Image" />
                        
                        </div>
                    </div>
                </div>
            ))
            :
            <div className='font-bold text-2xl text-center'>You haven't Purchased any books Yet!!!!</div>
        }
    </div>
  )
}

export default Purchase