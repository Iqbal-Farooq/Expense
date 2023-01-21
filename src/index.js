import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap"

import "../node_modules/bootstrap/dist/css/bootstrap.css"

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
<<<<<<< HEAD
root.render(<AuthProvider>
  
  <BrowserRouter>
  
     <App />
 
  
  </BrowserRouter>
   </AuthProvider>
   
=======
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
>>>>>>> 4627d7572da091811ab57bf1419d8de852adb720
);


