import React from 'react'
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { FaBook, FaUsers } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
// import {  Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer, PieChart, Pie } from 'recharts';
import { Bar, Pie } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement,Tooltip,Legend, CategoryScale,LinearScale,BarElement,Title} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);


function AdminDashboard() {

  const data = {
    labels: ["Books", "Users", "Employees"],
    datasets: [
      {
        label: "Book Purchase ratio",
        data: [100, 150, 75],
        backgroundColor: [
          "#e8daa0",
          "#e8c5a0",
          "#edbab2",
        ],
        borderWidth: 1,
      },
    ],
  };



  return (
    <>
    <AdminHeader/>
    <div className='md:grid grid-cols-5 gap-2'>
      <div className='col-span-1'>
        <AdminSidebar/>
      </div>
      <div className='col-span-4 p-10'>
         {/* cards */}
         <div className='md:grid grid-cols-3'>
            {/* card1 */}
            <div className='md:px-5 my-5 md:my-0'>
              <div className='bg-orange-100 px-4 py-8 flex justify-center items-center text-5xl rounded'>
                <FaBook/>
                <div className='text-center ms-10 md:ms-5'>
                  <h3 className='text-lg'>Books</h3>
                  <h3 className='text-2xl'>100+</h3>
                </div>
              </div>
            </div>
            {/* card2 */}
            <div className='md:px-5 my-5 md:my-0'>
              <div className='bg-red-100 px-4 py-8 flex justify-center items-center text-5xl rounded'>
                <FaUsers/>
                <div className='text-center ms-10 md:ms-5'>
                  <h3 className='text-lg'>Users</h3>
                  <h3 className='text-2xl'>100+</h3>
                </div>
              </div>
            </div>
            {/* card3 */}
            <div className='md:px-5 my-5 md:my-0'>
              <div className='bg-yellow-100 px-4 py-8 flex justify-center items-center text-5xl rounded'>
                <FaPeopleGroup/>
                <div className='text-center ms-10 md:ms-5'>
                  <h3 className='text-lg'>Employees</h3>
                  <h3 className='text-2xl'>100+</h3>
                </div>
              </div>
            </div>
         </div>
         {/* chart */}
         <div className='md:grid grid-cols-2 p-5 mt-10'>
            <div>
              {/* Book Purchase ratio - Bar Chart */}
             <Bar data={data}/>
            </div>
            <div>
              {/* Growth ratio - Pie Chart */}
              {/* <PieChart data={data}/> */}
               <Pie data={data} />
            </div>
         </div>
      </div>
    </div>
  
    </>
  )
}

export default AdminDashboard