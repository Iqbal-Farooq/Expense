import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap"

import "../node_modules/bootstrap/dist/css/bootstrap.css"

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './AUth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthProvider>
  
  <BrowserRouter>
  
     <App />
 
  
  </BrowserRouter>
   </AuthProvider>
   
);


