import SignUp from "./Singup/Signup";
import AuthProvider from "./AUth/AuthContext";
import ExpansesItem from "./Expenses/ExpenseItem";
import Profile from "./Expenses/Profile";


import { AuthContext } from "./AUth/AuthContext";
import { useContext,} from "react";
import { useHistory } from "react-router-dom";
import { Route,Redirect} from "react-router-dom";

import { Navbar, NavLink, } from "react-bootstrap";



function App() {
  const ctx=useContext(AuthContext)
  const history=useHistory();

  const Logut=()=>{
    ctx.Logout();
    history.replace("./Singup/Signup")

  }
 
  return ( 
    <>
    <Navbar> {ctx.isLogin && <NavLink  to='#'><button onClick={Logut}> Logout</button> </NavLink>}</Navbar>
    <switch>
 
                            
                      {ctx.isLogin && <Route path="/Expenses/ExpenseItem"><ExpansesItem /></Route>}
                     {!ctx.isLogin && <SignUp />} 
                     <Route path="/Expenses/Profile" ><Profile /></Route>
                     {/* <Route path="/Singup/Logout">{ ctx.isLogin &&  <LogOut></LogOut>} 
                     {!ctx.isLogin && <Redirect to="/Singup/Logout" />}
                     </Route> */}
  
    </switch>
 </>
  )
}

export default App;
