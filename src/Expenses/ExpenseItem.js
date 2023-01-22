import React from "react";
import './Expenses.css'
import { useState,useRef,useContext,useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AUth/AuthContext";






const ExpansesItem=()=>{
    
    const history=useHistory();
    const ctx=useContext(AuthContext);
  

    const ChangeEventHAndler=()=>{
        history.replace('./Profile');

    }

    const Verify=()=>{
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y",{
            method:"POST",
            body:JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:ctx.tokenid,
            }),headers:{
    'Content-Type': "application/json"
},

        }).then(res=>{
            if(res.ok){
                return res.json();
            }else{
                return res.json().then((data)=>{
                    console.log(data.error.message)
                    alert(data.error.message)
                })
            }
        }).then(data=>{alert('Request sent ',data.email)
            console.log(data)}).catch(err=>{console.log(err)
        alert(err)});
    }
    

    return(<> 
    <Navbar className="top">
   {<p >Welcome to Expense Tracker !!!</p>}
   <button onClick={Verify} >Verify-Email</button>
    {<p className="top1"> your profile is incomplete <span className="top11" onClick={ChangeEventHAndler}> Complete now</span></p>}
    
   </Navbar>
    <hr />

    </>)
}
export default ExpansesItem;