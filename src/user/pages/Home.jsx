import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaSearch } from 'react-icons/fa'
import landing from '../../assets/hero1.png'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeBooksAPI } from '../../services/allAPI'
import { searchContext } from '../../contextAPI/ShareContext'
import { ToastContainer, toast } from 'react-toastify';


function Home() {

  const navigate = useNavigate()
  const {searchKey,setSearchKey} = useContext(searchContext)

  const [homeBooks,setHomeBooks] = useState([])

  useEffect(()=>{
    getHomeBooks()
  },[])

  const getHomeBooks = async()=>{
    const result = await getHomeBooksAPI()
    console.log(result);
    if(result.status==200){
      setHomeBooks(result.data)
    }
  }

  const handleSearch = ()=>{
    if(!searchKey){
      toast.warning("Please input a Book Title To Search!!!")
    }else if(!sessionStorage.getItem("token")){
      toast.warning("Please login To Proceed Search!!")
      setTimeout(()=>{
        navigate("/login")
      },2000)
    }else if(sessionStorage.getItem("token")){
      navigate('/books')
    }else{
      toast.error("Something Went Wrong!!!")
    }
  }

  return (
    <>
      <Header/>
      {/* hero section */}
      <div  style={{height: '500px',backgroundImage: `url(${landing})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}  className='flex flex-col justify-center items-center  text-white'>
        <div style={{height:'500px', backgroundColor:'rgba(0,0,0,0.4)'}} className='w-full flex flex-col justify-center items-center'>
          <h1 className='text-6xl font-bold'>Wonderful Gifts</h1>
          <p>Gift your family and friends a book</p>
          <div className='mt-9 flex items-center'>
            <input onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search A Book Title' type="text" className='bg-white p-2 rounded-3xl w-100 text-black' />
            <FaSearch onClick={handleSearch} className='text-gray-500 cursor-pointer' style={{marginLeft:'40px'}}/>
          </div>
        </div>
      </div>

      {/* new arrivals */}
      <section className='md:px-40 my-5 p-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-bold'>NEW ARRIVALS</h1>
        <h1 className='text-2xl my-2'>Explore Our Latest Collection</h1>
        <div className='md:grid grid-cols-4 w-full my-10'>
           {/* duplicate according to book */}
           {
            homeBooks.length>0 ?
            homeBooks?.map(book=>(
              <div key={book?._id} className='shadow rounded p-3 m-4 md:my-0 '>
                  <img width={'100%'} height={'300px'} src={book?.imageURL} alt="book" />
                  <div className='flex flex-col justify-center items-center mt-4'>
                    <h2 className='text-blue-700 font-bold text-xl'>{book?.author}</h2>
                    <h3 className='text-lg'>{book?.title}</h3>
                    <p className='font-bold text-red-600'> ₹ {book?.discountPrice}</p>
                  </div>
              </div>
            ))
            :
            <p className='font-bold text-center text-red-500 my-3'>Loading......</p>
           }
        </div>
        <div className='text-center my-10'>
          <Link to={'/books'} className='bg-black p-3 text-white font-black'>Explore more...</Link>
        </div>
      </section>

       {/* Authors */}
      <section className=' md:grid grid-cols-2 items-center gap-10 md:px-40  p-5'>
        <div>
            <h2 className='text-xl font-bold'>FEATURED AUTHORS</h2>
            <h3 className='text-xl my-1'>Captivates with every word</h3>
            <p className='my-5 text-justify'>Welcome to the Author Spotlight section of our bookstore website! This feature is designed to celebrate writers, showcase their creative journeys, and help readers discover the minds behind their favorite books.</p>
            <p className='text-justify'>Our Author Features include:</p>

            <p className='text-justify my-3'><span className='font-black'>✨ Author Profiles : </span> Get to know each author through detailed profiles that highlight their biography, writing style, achievements, and personal inspirations.</p>

            <p className='text-justify my-3'><span className='font-black'>📖 Published Works : </span> Explore a curated list of books written by the author with quick access to book details, reviews, and purchase options.</p>

            <p className='text-justify my-3'><span className='font-black'>🎤 Interviews & Insights : </span> Exclusive interviews, behind-the-scenes stories, and writing tips that offer a deeper look into the author’s creative world.</p>
        </div>
        <div className='p-5 flex items-center justify-center'>
          <img src=" https://images.squarespace-cdn.com/content/v1/64bfd6aa127fba0754a78d65/1690617601186-7MS4W32UWBXKFKZTCQ14/authorphotos5-1024x683.jpg" alt="author" />
        </div>
        
        
      </section>

      {/* TESTIMONIALS */}
      <section  className='md:px-40 my-5 p-5 flex flex-col justify-center items-center'>
        <h2 className='text-xl font-bold'>TESTIMONIALS</h2>
        <h3 className='text-xl my-1'>See What Others Are Saying</h3>
        <div className='my-5 flex flex-col justify-center items-center'>
          <img width={'200px'} height={'200px'} style={{borderRadius:'50%'}} src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg" alt="User" />
          <h3 className='my-3'>Luthur King</h3>
          <p className='text-justify'>This bookstore has completely changed the way I discover new books. The recommendations are always spot-on, and the delivery is super fast. I love the clean interface and the huge collection! The user experience is amazing! Easy navigation, great deals, and beautifully organized categories. I appreciate how quickly customer support responds too.</p>
        </div>
      </section>

            {/* toster */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  )
}

export default Home