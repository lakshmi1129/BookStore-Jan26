import React, { useEffect, useState } from 'react'
import { deleteuserUploadBooksAPI, getUserBooksAPI } from '../../services/allAPI';

function BookStatus() {
    const [uploadBooks,setUploadBooks] =useState([])
    // console.log(uploadBooks);

    useEffect(()=>{
        getUserBooks()
    },[])

    const getUserBooks =async()=>{
        const result = await getUserBooksAPI()
        // console.log(result); 
        setUploadBooks(result.data)
    }

    const removeBook = async(id)=>{
        const result = await deleteuserUploadBooksAPI(id)
        getUserBooks()
    }
    
  return (
    <div className='p-10 my-15 shadow rounded'>
        {/* duplicate uploaded books */}
        {
            uploadBooks.length>0 ?
            uploadBooks?.map(book=>(
                <div className='p-10 rounded bg-gray-100 my-15'>
                    <div className='md:grid grid-cols-[3fr_1fr]'>
                        <div className='px-4'>
                            <h1 className='text-2xl'>{book?.title}</h1>
                            <h2 className='text-xl'>{book?.author}</h2>
                            <h3 className='text-lg text-blue-500'>$ {book?.discountPrice}</h3>
                            <p className='text-justify'>{book?.abstract}</p>
                            {/* status image-approved/pending */}
                            <div className='flex mt-3'>
                               {
                                book?.status=="pending"?
                                 <img width={'120px'} height={'120px'} src="https://png.pngtree.com/png-vector/20230830/ourmid/pngtree-pending-imminent-rubber-stamp-image_9932560.png" alt="Pending" />
                                :
                                book?.status=="approved"?
                                 <img width={'120px'} height={'120px'} src="https://static.vecteezy.com/system/resources/previews/024/382/936/non_2x/approved-sign-with-checkmark-symbol-icon-label-stamp-green-round-design-transparent-background-free-png.png" alt="Approved" />
                                :
                                <img width={'120px'} height={'120px'} src="https://static.vecteezy.com/system/resources/thumbnails/019/787/028/small_2x/sold-icon-on-transparent-background-free-png.png" alt="Sold" />

                               }
                            </div>
                        </div>
                        <div className='px-4 mt-4 md:mt-0'>
                            <img className='w-full' src={book?.imageURL} alt="Book Image" />
                            <div className='mt-4 flex justify-end'>
                                <button onClick={()=>removeBook(book?._id)} className='bg-red-600 text-white p-2 rounded'>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            :
            <div className='font-bold text-2xl'>You haven't upload any books Yet!!!!</div>
        }
    </div>
  )
}

export default BookStatus