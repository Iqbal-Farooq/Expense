import React from "react";
import './Expenses.css'
import { useState,useRef,useContext,useEffect } from "react";
import { Container, Navbar,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AUth/AuthContext";
import ExpenseForm from "../ExpensesForm/ExpensesInput";
import { useSelector } from "react-redux";






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
    <Navbar className="top">
   {<p >Welcome to Expense Tracker !!!</p>}
   <Button onClick={Verify}  variant='success' size="sm">Verify-Email</Button>
    {<p className="top1"> your profile is incomplete <span className="top11" onClick={ChangeEventHAndler}> Complete now</span></p>}
    
   </Navbar>
    <hr />
    <ExpenseForm />

    </>)
}
export default ExpansesItem;