import SignUp from "./Singup/Signup";

import ExpansesItem from "./Expenses/ExpenseItem";
import Profile from "./Expenses/Profile";
import Forgot from "./Singup/Forgot";
import ExpenseForm from "./ExpensesForm/ExpensesInput";


// import { AuthContext } from "./AUth/AuthContext";
import { useContext,} from "react";
import { useNavigate } from "react-router-dom";
import { Route,Redirect,Routes} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./AUth/AuthContext";

import { Navbar, NavLink,Nav,Container } from "react-bootstrap";



function App() {
  // const ctx=useContext(AuthContext)
  const history=useNavigate();
  const dispatch=useDispatch();
  const Logout=useSelector(state=>state.auth);

  const Logut=()=>{
    // ctx.Logout();
    dispatch(authActions.logout())
   
     history("/");

  }
 
  return ( 
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
          
             <Navbar > { <NavLink  to='#'><button onClick={Logut}> Logout</button> </NavLink>} </Navbar>
            
          </Nav>
        </Container>
      </Navbar>
   
    
    <Routes>
  

                      { <Route path="/ExpenseItem" element={<ExpansesItem />}></Route>}
                     
                      <Route path="ExpenseItem/:Profile"  element={<Profile />} ></Route> 
                    <Route path='/Forgot' exact  element={<Forgot />}> </Route>
                    <Route path="/ExpensesInput" element={<ExpenseForm />}></Route>
                     { <Route path="/" exact element={<SignUp />}></Route> }
                     
</Routes>
  

    
 </>
  )
}

export default App;
