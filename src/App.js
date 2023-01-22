import SignUp from "./Singup/Signup";
import AuthProvider from "./AUth/AuthContext";
import ExpansesItem from "./Expenses/ExpenseItem";
import Profile from "./Expenses/Profile";


import { AuthContext } from "./AUth/AuthContext";
import { useContext,} from "react";
import { Route,} from "react-router-dom";



function App() {
  const ctx=useContext(AuthContext)
 
  return ( 
    <switch>
 
                            
                      {ctx.isLogin && <Route path="/Expenses/ExpenseItem"><ExpansesItem /></Route>}
                     {!ctx.isLogin && <SignUp />} 
                     <Route path="/Expenses/Profile" ><Profile /></Route>
  
    </switch>
 
  )
}

export default App;
