
import React,{Suspense} from "react";

import { useContext,} from "react";
import { useNavigate } from "react-router-dom";
import { Route,Redirect,Routes} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./AUth/AuthContext";

import { Navbar, NavLink,Nav,Container } from "react-bootstrap";


const SignUp=React.lazy(()=>import("./Singup/Signup"));
const ExpansesItem=React.lazy(()=>import("./Expenses/ExpenseItem"));
const Profile=React.lazy(()=>import("./Expenses/Profile"));
const Forgot=React.lazy(()=>import("./Singup/Forgot"));
const ExpenseForm=React.lazy(()=>import("./ExpensesForm/ExpensesInput"))



function App() {
  
  const history=useNavigate();
  const dispatch=useDispatch();
  const Logout=useSelector(state=>state.auth);
  const IsLoggedIn=useSelector(state=>state.auth.isLoggedin);
  console.log("LOGGED ",IsLoggedIn);

 
  return ( 
    <>
     <Suspense fallback={<h1 style={{textAlign:"Center",fontWeight:"bold",margin:"30%"}}>Loading... 🚗 </h1>} >
    
    <Routes>

                      { <Route path="/ExpenseItem" element={<ExpansesItem />}></Route>}

                      <Route path="ExpenseItem/:Profile"  element={<Profile />} ></Route> 
                    <Route path='/Forgot' exact  element={<Forgot />}> </Route>
                    <Route path="/ExpensesInput" element={<ExpenseForm />}></Route>
                     { <Route path="/" exact element={<SignUp />}></Route> }

</Routes>
</Suspense>

 </>
  )
}

export default App;
