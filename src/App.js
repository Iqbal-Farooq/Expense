import SignUp from "./Singup/Signup";

import ExpansesItem from "./Expenses/ExpenseItem";

import { AuthContext } from "./AUth/AuthContext";
import { useContext, useEffect } from "react";
import { Route,} from "react-router";



function App() {
  const ctx=useContext(AuthContext)
 
  return ( 
    <>
 
          {ctx.isLogin &&<Route path="/"> <ExpansesItem /></Route>}
  
   
                      {!ctx.isLogin && <SignUp />} 
       
      
  
     
   
    </>
   
    
   
  )
}

export default App;
