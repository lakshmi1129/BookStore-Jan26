import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../services/allAPI'
import { searchContext } from '../../contextAPI/ShareContext'

function Books() {
  const {searchKey,setSearchKey} = useContext(searchContext)
  const [toggle, setToggle] = useState(false)
  const [token,setToken] = useState("")
  const [allBooks,setAllBooks] = useState([])
  const [categoryList,setCategoryList] = useState([])
  const [dummyAllBooks,setDummyAllBooks] = useState([])

  useEffect(()=>{
          if(sessionStorage.getItem("token")){
              const userToken = sessionStorage.getItem("token")
              setToken(userToken)
              getBooks()
          }
  },[searchKey])

  const getBooks = async()=>{
    const result = await getAllBooksAPI(searchKey)
    // console.log(result);
    if(result.status==200){
      setAllBooks(result.data)
      setDummyAllBooks(result.data)
      const tempCategory = result.data.map(book=>book.category.toLowerCase())
      setCategoryList([...new Set(tempCategory)])
    }
  }
  console.log(categoryList);

  const filterBooks =(category)=>{
    if(category != 'all'){
      setAllBooks(dummyAllBooks?.filter(book=>book.category.toLowerCase()==category))
    }else{
      getBooks()
    }
  }
      

  return (
    <>
    <Header/>
    {
      token?
      <>
      <div className='flex flex-col justify-center items-center my-5'>
        <h1 className='text-3xl font-bold my-5'>All Books</h1>
        <div className='flex my-5'>
          <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" className='p-2 border border-gray-200 w-100' placeholder='Search Book By Title' />
          {/* <button className='p-2 bg-blue-800 text-white'>Search</button> */}
        </div>
      </div>
      {/* grid filter and book card */}
      <div className='md:grid grid-cols-4 p-5 md:px-40 mb-10'>
        <div className='col-span-1'>
          <div className='flex justify-between'>
              <h1 className='text-2xl font-bold'>Filter</h1>
              <button onClick={()=>setToggle(!toggle)} className='font-bold text-2xl md:hidden'><FaBars/></button>
          </div>
          {/* filter category */}
          <div className={toggle ? "block":"hidden md:block"}>
            <div className='mt-3'>
              <input onClick={()=>filterBooks('all')} type="radio" name='filter' id='no-filter' />
              <label className='ms-3' htmlFor="no-filter">All</label>
            </div>

            {/* duplicate filter category */}
            {
              categoryList?.map(category=>(
                <div key={category} className='mt-3'>
                  <input onClick={()=>filterBooks(category)} type="radio" name='filter' id={category} />
                  <label htmlFor={category} className='ms-3'>{category}</label>
                </div>
              ))
            }

          </div>
        </div>
        {/* book card */}
        <div className='col-span-3'>
            <div className='md:grid grid-cols-4 w-full mt-5 md:mt-0'>

           {/* duplicate according to book */}
           {
            allBooks.length>0?
              allBooks?.map(book=>(
                <div key={book?._id} className='shadow rounded p-3 m-4 md:mb-2' hidden={book?.status=="pending" || book?.status=="sold"}>
                  <img width={'100%'} height={'300px'} src={book?.imageURL} alt="book" />
                  <div className='flex flex-col justify-center items-center mt-4'>
                    <h2 className='text-blue-700 font-bold text-xl'>{book?.author}</h2>
                    <h3 className='text-lg'>{book?.title}</h3>
                    <Link to={`/books/${book?._id}`} className='font-bold bg-blue-800 p-2 text-white mt-2'>View Book</Link>
                </div>
           </div>
              ))
            :
            <div className='text-center my-5 font-bold'>Books not Found!!!!</div>
           }

        </div>
        </div>
      </div>
      </>
      :
      <div className='w-full h-screen flex justify-center items-center flex-col'>
        <img className='w-50' src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="Login..." />
        <p className='text-lg font-bold my-15'>Please <Link to={'/login'} className='text-blue-700 underline'>LOGIN</Link> To Explore more.....</p>
      </div>
    }
    </>
  )
}

export default Books