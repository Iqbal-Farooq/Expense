import SignUp from "./Singup/Signup";
import AuthProvider from "./AUth/AuthContext";
import ExpansesItem from "./Expenses/ExpenseItem";
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
   
  )
}

export default App;
