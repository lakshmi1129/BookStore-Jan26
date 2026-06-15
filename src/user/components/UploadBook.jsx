import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import { addBookAPI, getBookDetailsAPI } from '../../services/allAPI';
import useDebounce from '../../hooks/useDebounce';

function UploadBook() {
    
    const [bookDetails,setBookDetails] = useState({
        title:"",author:"",pages:"",imageURL:"",price:"",discountPrice:"",abstract:"",publisher:"",isbn:"",language:"",category:"",uploadedImages:[]
    })
    const [preview,setPreview] =useState("")
    const [previewList,setPreviewList] =useState([])
    
    const debounceTitleSearch = useDebounce(bookDetails.title,1000)

    useEffect(()=>{
        
        if(debounceTitleSearch){
            console.log("Gemini Api Call"); 
            generateAbstract() 
        }
    },[debounceTitleSearch])


    const generateAbstract = async()=>{
        console.log("Debounce Value",debounceTitleSearch);
        const result = await getBookDetailsAPI(debounceTitleSearch)
        console.log(result.data.content);
        setBookDetails({...bookDetails,abstract:result.data.content})
    }

    const handleUploadBookImage =(e)=>{
        const imageFile = e.target.files[0]
        const uploadBookImageArray = bookDetails.uploadedImages
        uploadBookImageArray.push(imageFile)
        setBookDetails({...bookDetails,uploadedImages:uploadBookImageArray})
        const url = URL.createObjectURL(imageFile)
        setPreview(url)
        const demoPreviewList = previewList
        demoPreviewList.push(url)
        setPreviewList(demoPreviewList)
    }

    const resetForm =()=>{
        setBookDetails({ title:"",author:"",pages:"",imageURL:"",price:"",discountPrice:"",abstract:"",publisher:"",isbn:"",language:"",category:"",uploadedImages:[]})
        setPreview("")
        setPreviewList([])
    }

    const handleAddBook=async()=>{
        const {title,author,pages,imageURL,price,discountPrice,abstract,publisher,isbn,language,category,uploadedImages}= bookDetails
        if(!title || !author || !pages || !imageURL || !price || !discountPrice || !abstract || !publisher || !isbn || !language || !category || uploadedImages.length==0){
            toast.info("Please Fill the Form Completly!!")
        }else{
            // api call
            const reqBody = new FormData()
            for(let key in bookDetails){
                if(key !="uploadedImages"){
                  reqBody.append(key,bookDetails[key])
                }else{
                    bookDetails.uploadedImages.forEach(imageFile=>{
                        reqBody.append("uploadedImages",imageFile)
                    })
                }
            }
            const result = await addBookAPI(reqBody)
            console.log(result);
            if(result.status==200){
                toast.success("Book Added Successfully!!!!")              
            }else{
                toast.warning(result)
            }
            resetForm()
        }
    }
    

  return (
    <div className='p-10 my-20 mx-5 bg-gray-200'>
        <h1 className='text-center text-3xl font-medium'>Upload Book Details</h1>
        <div className='md:grid grid-cols-2 mt-10 w-full'>
          <div className='px-3'>
                <div className='mb-3'>
                    <input value={bookDetails.title} onChange={e=>setBookDetails({...bookDetails,title:e.target.value})} type="text" placeholder='Book Title' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.author} onChange={e=>setBookDetails({...bookDetails,author:e.target.value})} type="text" placeholder='Author' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.pages} onChange={e=>setBookDetails({...bookDetails,pages:e.target.value})} type="text" placeholder='No.Of Pages' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <input type="text" value={bookDetails.imageURL} onChange={e=>setBookDetails({...bookDetails,imageURL:e.target.value})} placeholder='Book CoverPage URL' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.price} onChange={e=>setBookDetails({...bookDetails,price:e.target.value})} type="text" placeholder='Original price' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <input type="text" value={bookDetails.discountPrice} onChange={e=>setBookDetails({...bookDetails,discountPrice:e.target.value})} placeholder='Discount Price' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <textarea value={bookDetails.abstract} onChange={e=>setBookDetails({...bookDetails,abstract:e.target.value})} type="text" placeholder='Abstract' rows={'5'} className='w-full p-2 rounded bg-white' />
                </div>
          </div>
          <div className='px-3'>
                <div className='mb-3'>
                    <input value={bookDetails.publisher} onChange={e=>setBookDetails({...bookDetails,publisher:e.target.value})} type="text" placeholder='Publisher' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <input type="text" value={bookDetails.isbn} onChange={e=>setBookDetails({...bookDetails,isbn:e.target.value})} placeholder='ISBN' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <input type="text" value={bookDetails.language} onChange={e=>setBookDetails({...bookDetails,language:e.target.value})} placeholder='Language' className='w-full p-2 rounded bg-white' />
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.category} onChange={e=>setBookDetails({...bookDetails,category:e.target.value})} type="text" placeholder='Category' className='w-full p-2 rounded bg-white' />
                </div>
                {/* Upload book images-3 */}
                <div className='flex justify-center items-center mb-3 mt-10'>
                    <label htmlFor="bookImages">
                        <input onChange={e=>handleUploadBookImage(e)} type="file" id='bookImages' hidden />
                        <img style={{width:"200px",height:"200px"}} src={preview?preview : "https://wupengcheng.gallerycdn.vsassets.io/extensions/wupengcheng/upload-ftp/0.0.3/1663568570818/Microsoft.VisualStudio.Services.Icons.Default"} alt="Book File not Found" />
                    </label>
                </div>
                {/* display uploaded images */}
                  {
                    preview &&
                     <div className='flex justify-center items-center '>
                        {
                            previewList?.map((imageURL,index)=>(
                                <img key={`${imageURL}-${index}`} style={{width:"70px",height:"70px"}} className='mx-2' src={imageURL} alt="Book image not Found" />
                            ))
                        }
                        {
                            previewList.length<3 &&
                            <label htmlFor="bookUpload">
                                <input onChange={e=>handleUploadBookImage(e)} type="file" id='bookUpload' hidden />
                                <FaPlus className='text-3xl ms-2'/>
                            </label>
                        }
                     </div>
                  }
          </div>
        </div>
        {/* button */}
            <div className='flex md:justify-end justify-center w-full p-3 mt-5'>
                <button onClick={resetForm} className='bg-gray-600 text-white py-2 px-3 rounded hover:text-gray-600 hover:bg-white'>RESET</button>
                <button onClick={handleAddBook} className='bg-blue-600 text-white py-2 px-3 rounded ms-2  hover:text-blue-600 hover:bg-white'>ADD BOOK DETAILS</button>                        
            </div>
         {/* toster */}
                       <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default UploadBook