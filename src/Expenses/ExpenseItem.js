import React from "react";
import './Expenses.css'
import { useState,useRef,useContext,useEffect } from "react";
import { Container, Navbar,Button,Nav,NavItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../ExpensesForm/ExpensesInput";
import { useSelector } from "react-redux";
import LOgout from "../Singup/Logout";






const ExpansesItem=()=>{
    
    const history=useNavigate();
    // const ctx=useContext(AuthContext);
        const tokenid=useSelector(state=>state.auth.token);
  

    const ChangeEventHAndler=(e)=>{
        e.preventDefault();
        history('./Profile');

    }

    const Verify=()=>{
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y",{
            method:"POST",
            body:JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:tokenid,
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
     <Navbar bg="dark" variant="dark">
        <Container className="nav">
      
           <li style={{color:"white"}}>Welcome to Expense Tracker !!!</li>
            <li > <Button onClick={Verify}  variant='success' size="sm">Verify-Email</Button></li>
            <li> <LOgout /></li>
            <li style={{color:"white"}}>{<p className="top1"> your profile is incomplete ? <span className="top11" onClick={ChangeEventHAndler}> Complete now</span></p>}</li>
          
        
          
        </Container>
      </Navbar>
   
   
    {/* <hr /> */}
    <ExpenseForm />

    </>)
}
export default ExpansesItem;