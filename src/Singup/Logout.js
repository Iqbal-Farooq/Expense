import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../AUth/AuthContext";


const LOgout=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const IsLoggedIn=useSelector(state=>state.auth.isLoggedin)
     
  const Logut=()=>{
    // ctx.Logout();
    dispatch(authActions.logout())
   
     navigate("/");

  }

    return(<>
    
          
             {IsLoggedIn &&<Button  size="sm" variant="danger" onClick={Logut}> Logout</Button> }
            
         

    </>)
    
}
export default LOgout;