import React, { createContext, useEffect, useState } from 'react'
export const routeContext = createContext("")

function RouteGuardContext({children}) {

    const [role,setRole] = useState("")
    const [authorizedUser,setAuthorizedUser] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
            const user = JSON.parse(sessionStorage.getItem("user"))
            setAuthorizedUser(true)
            setRole(user.role)
        }
    },[role,authorizedUser])

  return (
    <routeContext.Provider value={{role,setRole,authorizedUser,setAuthorizedUser}}>
        {children}
    </routeContext.Provider>
  )
}

export default RouteGuardContext