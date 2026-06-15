import apiService from "../api/apiService";

// register : auth component
export const registerAPI = async (userData) =>{
    return await apiService("POST","/register",userData)
}

// login : auth component
export const loginAPI = async (userData) =>{
    return await apiService("POST","/login",userData)
}

// google login : auth component
export const googleLoginAPI = async (userData) =>{
    return await apiService("POST","/google-login",userData)
}

// user edit  : edit component update button clicked
export const userEditAPI = async (userId,userData) =>{
    return await apiService("PUT",`/user/${userId}`,userData)
}

// add book  : uploadBook component add button clicked
export const addBookAPI = async (bookDetails) =>{
    return await apiService("POST",`/books`,bookDetails)
}

// get Home books  : Home component - when page loads
export const getHomeBooksAPI = async () =>{
    return await apiService("GET",`/home-books`,{})
}

// get All books - all-books  : Book component - when page loads
export const getAllBooksAPI = async (searchKey) =>{
    return await apiService("GET",`/all-books?search=${searchKey}`,{})
}

// get user books - user-books  : bookstatus component - when page loads
export const getUserBooksAPI = async () =>{
    return await apiService("GET",`/user-books`,{})
}

// get user brought books - brought-books  : Purchase Book component - when page loads
export const getBroughtBooksAPI = async () =>{
    return await apiService("GET",`/brought-books`,{})
}

// books/6a2116cd47eb95844d99a257 - remove user upload books - bookStatus-books  : Purchase Book component - when delete button clicked.
export const deleteuserUploadBooksAPI = async (bookId) =>{
    return await apiService("DELETE",`/books/${bookId}`,{})
}

// view a single book - /book/6a211ab047eb95844d99a25d - view- open 
export const viewBookAPI = async (id) =>{
    return await apiService("GET",`/book/${id}`,{})
}

// Buy book - book/6a211ab047eb95844d99a25d/buy - View - clicked on buy button
export const buyBookAPI = async (id) =>{
    return await apiService("PUT",`/book/${id}/buy`,{})
}


// http://localhost:3000/admin/6a168cf597d4a17cd94c25dd:  admin settings page...
export const adminEditAPI = async (adminId,adminData) =>{
    return await apiService("PUT",`/admin/${adminId}`,adminData)
}


//user-list:  admin resources page...
export const userListAPI = async () =>{
    return await apiService("GET",`/user-list`,{})
}


//book-list:  admin resources page...
export const bookListAPI = async () =>{
    return await apiService("GET",`/book-list`,{})
}

//update status- book:  admin resources page. when approve button clicked..
export const editBookAPI = async (id) =>{
    return await apiService("PUT",`/books/${id}`,{})
}


// books-ai- POST  request by uploadBook Component when title enters
export const getBookDetailsAPI = async (title) =>{
    return await apiService("POST",`/books-ai`,{title})
}


