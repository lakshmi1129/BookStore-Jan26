import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ShareContext from './contextAPI/ShareContext.jsx'
import RouteGuardContext from './contextAPI/RouteGuardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <GoogleOAuthProvider clientId='769379536255-sglam37s2tf68slitd0c9saaobaju5pr.apps.googleusercontent.com'>
         <ShareContext> 
           <RouteGuardContext> 
             <App />
            </RouteGuardContext>
         </ShareContext>
       </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
