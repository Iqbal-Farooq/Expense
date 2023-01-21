<<<<<<< HEAD
import React from "react";
import './Expenses.css'
import { useState,useRef,useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { AuthContext } from "../AUth/AuthContext";




const ExpansesItem=()=>{
    const[Profile,setProfile]=useState(false);
    const NameRef=useRef();
    const UrlRef=useRef();
    const ctx=useContext(AuthContext);

    const ChangeEventHAndler=()=>{
       setProfile((prevstate)=>!prevstate);

    }
    const SendData=(e)=>{
        e.preventDefault();
        console.log(NameRef.current.value);
        console.log(UrlRef.current.value,ctx.tokenid)
        const name=NameRef.current.value;
        const Url=UrlRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y',{
            method:"POST",
            body:JSON.stringify({
                idToken:ctx.tokenid,
                displayName:name,
                photoUrl:Url,
                returnSecureToken:true,


            }),headers:{
    'Content-Type': "application/json"
},

        }).then(res=>{
                if(res.ok){
                    return res.json()
                }
                else{
                    return res.json().then(data=>{console.log(data)
                    alert(data.error.message)})
                }
            }).then(data=>console.log(data),alert("SUCCESS")).catch(err=>console.log(err));

    }

    return(<> 
    <Navbar className="top">
   {!Profile &&<p >Welcome to Expense Tracker !!!</p>}
    {!Profile &&<p className="top1"> your profile is incomplete <span className="top11" onClick={ChangeEventHAndler}> Complete now</span></p>}
    {Profile && <p>Winners Never Quit,Quitters Never Win </p>}
    {Profile && <p className="top1"> Your profile is 64% completes. A complete Profile has Higher chances
          of landing a job.</p>}</Navbar>
    <hr />



       { Profile &&<div  > 
       <div className="Form"> 
       <h4>Contact Details</h4>
       <button onClick={ChangeEventHAndler} className="btnClr">cancel</button>
       </div>
       <div className="Input1"> 
       <div>
       <label className="LAbel" >FULL NAME : </label>
       <input  type='text' placeholder="FullName" ref={NameRef} ></input>
       </div>
        <div> 
         <label className="LAbel">Profile Photo Url :</label>
         <input  type='text' placeholder="URL" ref={UrlRef} ></input>

          </div>
       </div>
        
          <div className="btn"><button className="btnClr"  onClick={SendData}>update</button></div>
          <hr className="Line"/>


        </div>}
   
   
 
    

    
    </>)
}
=======
import React from "react";
const ExpansesItem=()=>{
    return(<h1>welcome to expense tRacker</h1>)
}
>>>>>>> 4627d7572da091811ab57bf1419d8de852adb720
export default ExpansesItem;