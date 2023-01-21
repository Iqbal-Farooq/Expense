import SignUp from "./Singup/Signup";
import AuthProvider from "./AUth/AuthContext";
import ExpansesItem from "./Expenses/ExpenseItem";
<<<<<<< HEAD


import { AuthContext } from "./AUth/AuthContext";
import { useContext,} from "react";
import { Route,} from "react-router-dom";



function App() {
  const ctx=useContext(AuthContext)
 
  return ( 
    <switch>
 
                             {/* <Route path="/Expenses/ExpenseItem" exact><ExpansesItem /></Route>
                      <Route path="/Expenses/A" exact><A /></Route> */}
                      {ctx.isLogin && <Route path="/Expenses/ExpenseItem"><ExpansesItem /></Route>}
                     {!ctx.isLogin && <SignUp />} 
  
    </switch>
 
=======
import { AuthContext } from "./AUth/AuthContext";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Redirect } from "react-router";

function App() {
  const ctx=useContext(AuthContext)
  useEffect(()=>{
    

  },[ctx])
  return (
    <AuthProvider>
    <Routes >
   <Route path='./Expenses/ExpenseItem' exact>  <ExpansesItem /></Route>

   </Routes>
       {/* {!ctx.isLogin && <SignUp />}
    <ExpansesItem /> */}
   
    </AuthProvider>
   
>>>>>>> 4627d7572da091811ab57bf1419d8de852adb720
  )
}

export default App;
