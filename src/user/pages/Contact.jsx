import React, { useRef } from 'react'
import Header from '../components/Header'
import { FaLocationPin } from 'react-icons/fa6'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';


function Contact() {
  const form = useRef();

   const sendEmail = (e) => {
        e.preventDefault();
        const {name,email,title} = form.current
        if(name.value && email.value && title.value){
                emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
                publicKey: import.meta.env.VITE_PUBLIC_KEY,
              })
              .then(
                () => {
                  console.log('SUCCESS!');
                  toast.success("Thank You for Your Message...Our Team Will Contact u Soon!!!!")
                  name.value =""
                  email.value=""
                  title.value =""
                },
                (error) => {
                  console.log('FAILED...', error.text);
                },
              );
        }else{
          toast.warning("Please fill the Form Completly!!!!")
        }
      };


  return (
    <>
    <Header/>
    <div className='md:px-20 p-5 my-5'>
      <h1 className='text-center my-5 font-bold text-3xl'>Contacts</h1>
      <p className='text-justify'>Have questions, feedback, or need help finding the perfect book? We’d love to hear from you! Why Contact Us? Order-related support Book availability inquiries Return/replacement queries Bulk/Institutional purchase requests Author or partnership inquiries. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic veniam id eveniet recusandae pariatur, facilis fuga? Iusto, asperiores modi cum praesentium et, libero nisi eaque harum sed deleniti odio eveniet. Maiores delectus iusto voluptatibus officia eveniet sunt quibusdam mollitia, error fugit laborum dolorum deserunt! Quaerat magni ad, veritatis dolor iusto, aliquam nisi consequatur officiis perferendis unde, maiores quos praesentium voluptatibus. Magni dolores impedit, officia doloribus repellat fuga quos ad natus recusandae sed numquam fugiat, sapiente minima, nam vero incidunt libero earum. Minima praesentium laborum tenetur corporis quod dolorum maxime pariatur.</p>
      <div className='md:grid grid-cols-3 items-center md:px-40 p-5 mt-5 md:mt-0'>
        <div className='flex items-center my-3 md:my-0'>
          <div style={{width:'50px',height:'50px', borderRadius:'50%'}} className='flex items-center justify-center bg-gray-200'>
            <FaLocationPin/>
            </div>
            <p className='ms-5'>123 Main Street, Apt 4B, Anytown, CA 91234</p>
        </div>

        <div className='flex items-center my-3 md:my-0'>
          <div style={{width:'50px',height:'50px', borderRadius:'50%'}} className='flex items-center justify-center bg-gray-200'>
            <FaPhone/>
            </div>
            <p className='ms-5'>9878987898</p>
        </div>

        <div className='flex items-center my-3 md:my-0'>
          <div style={{width:'50px',height:'50px', borderRadius:'50%'}} className='flex items-center justify-center bg-gray-200'>
            <FaEnvelope/>
            </div>
            <p className='ms-5'>contact@bookstore.com</p>
        </div>
      </div>

      <div className='md:grid grid-cols-2 gap-10 my-5 p-5 md:px-40'>
        <div className='bg-gray-100 p-5 text-center'>
          <h1 className='font-semi-bold text-2xl'>Send Us Message</h1>
          <form  ref={form} onSubmit={sendEmail} >
              <div className='mb-5 mt-10'>
                <input name='name' placeholder='Name' type="text" className='bg-white w-full p-2' />
              </div>
              <div className='mb-5 '>
                <input name='email' placeholder='E Mail' type="text" className='bg-white w-full p-2' />
              </div>
              <div className='mb-5 '>
                <textarea name='title' placeholder='Message' type="text" className='bg-white w-full p-2' />
              </div>
              <div className='my-5'>
                <button type='submit' className='bg-black p-2 w-full text-white text-lg flex justify-center items-center'>Submit</button>
              </div>
          </form>
        </div>
        <div className='mt-5 md:mt-0'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.9841724225603!2d76.34009121061004!3d10.018164390046884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080ffce877d5ef%3A0x8bef6870ad11b98!2sLuminar%20Technolab!5e0!3m2!1sen!2sin!4v1778827354133!5m2!1sen!2sin" width="100%" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
     {/* toster */}
                  <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  )
}

export default Contact