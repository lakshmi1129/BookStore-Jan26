import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://bookstore-backend-jan26.onrender.com",
    timeout: 10000
})

// request interceptor - handling Token to append to header
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
         return Promise.reject(error)
    }   
)

// response interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("Response Received!!!");
        return response
    },
    (error)=>{
        if(error.response){
            const status = error.response.status
            if(status==401){
                console.log("Unauthorized Access.. Redirect to Login"); 
            }else if(status==404){
                console.log("API not Found!!");
            }else if(status==500){
                console.log("Server Error!!");
            }else if(error.request){
                console.log("No response from Server....");
                console.log(error.request);
                return error.request.response
            }else {
                console.log("Error: " +error.message);
            }
            return Promise.reject(error)
        }
    }
)

export default axiosInstance