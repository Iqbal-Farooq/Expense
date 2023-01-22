import SignUp from "./Singup/Signup";
import AuthProvider from "./AUth/AuthContext";
import ExpansesItem from "./Expenses/ExpenseItem";
import Profile from "./Expenses/Profile";
import Forgot from "./Singup/Forgot";


import { AuthContext } from "./AUth/AuthContext";
import { useContext,} from "react";
import { useHistory } from "react-router-dom";
import { Route,Redirect,Switch} from "react-router-dom";

import { Navbar, NavLink, } from "react-bootstrap";



function App() {
  const ctx=useContext(AuthContext)
  const history=useHistory();

  const Logut=()=>{
    ctx.Logout();
    history.replace("./")

  }
 
  return ( 
    <>
    <Navbar> {ctx.isLogin && <NavLink  to='#'><button onClick={Logut}> Logout</button> </NavLink>}</Navbar>
    <Switch>
 
                            
                      {ctx.isLogin && <Route path="/Expenses/ExpenseItem"><ExpansesItem /></Route>}
                    
                    
                     <Route path="/Expenses/Profile" exact ><Profile /></Route> 
                    <Route path='/Forgot' exact><Forgot /> </Route>
                      <Route path="/"><SignUp exact/></Route>
                    
  
    </Switch>
 </>
  )
}

export default App;
