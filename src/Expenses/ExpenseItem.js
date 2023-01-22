import React from "react";
import './Expenses.css'
import { useState,useRef,useContext,useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";






const ExpansesItem=()=>{
    
    const history=useHistory();
  

    const ChangeEventHAndler=()=>{
        history.replace('./Profile');

      

    }
    

    return(<> 
    <Navbar className="top">
   {<p >Welcome to Expense Tracker !!!</p>}
    {<p className="top1"> your profile is incomplete <span className="top11" onClick={ChangeEventHAndler}> Complete now</span></p>}
   </Navbar>
    <hr />



      
   
   
 
    

    
    </>)
}
export default ExpansesItem;