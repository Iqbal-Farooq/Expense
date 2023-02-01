import React from 'react'

import { useState,useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../AUth/AuthContext';


import { useNavigate,NavLink,Redirect } from 'react-router-dom';
import Forgot from './Forgot';
import {Col,Row,Form,Card,Container,Button} from 'react-bootstrap'

// import { AuthContext } from '../AUth/AuthContext'








const SignUp=()=>{
    const [email,SetEmail]=useState();
    const [password,setPassword]=useState();
    const[Confirm,SetConfirm]=useState();
    const[isLogin,SetISLogin]=useState(true);

    const dispatch=useDispatch();
    const isAuth=useSelector(state=>state.auth)

      const [formIsValid, setFormIsValid] = useState(false);

    const history=useNavigate();
         const Forgot=(e)=>{

       history('./Forgot');
  
    }


      const ValidatePassword=(password,Confirmpassword)=>{
        if(isLogin){
             return password===Confirmpassword;

        }else{
            return true;
        }
      
      }
      const EmailInput=(e)=>{
        SetEmail(e.target.value)
        

      }
      const PasswordInput=(e)=>{
        setPassword(e.target.value);
         setFormIsValid(ValidatePassword(e.target.value,Confirm));

      }
     const  updatePasswordInput=(e)=>{
        SetConfirm(e.target.value);
        setFormIsValid(ValidatePassword(password,e.target.value));
     }
     const SwitchHandler=()=>{
        SetISLogin(prevState=>!prevState)

     }



     const Submit=(e)=>{
        e.preventDefault();
        
      

        
        if(password===Confirm && isLogin){
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y',{
                method:"POST",
                body:JSON.stringify({
                    email:email,
                    password:password,
                    confirmpassword:password,
                     returnSecureToken: true,
                }),
                 headers: {
                 "Content-Type": "application/json",
                   },
            }).then(res=>{ if(res.ok){
                     alert("Success")
                      console.log('success-fully registered');
                      setPassword('');
                      SetEmail('');
                      SetConfirm('');
                    
             } else{
                 return res.json().then(data=>{
                    alert(data.error.message)
                          })}
                        })
        }if(!isLogin){
            console.log("login page")
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y',{
                method:"POST",
                body:JSON.stringify({
                    email:email,
                    password:password,

                     returnSecureToken: true,
                }),   headers: {
                 "Content-Type": "application/json",
                   },
            }).then(res=>{
                if(res.ok){
                    
                   
                    return res.json();
                }
                else{
                    return res.json().then(data=>{
                        alert(data.error.message);
                    })
                }
            }).then(data=>{


                // ctx.Login(data.idToken);
                localStorage.setItem('email',email)

                dispatch(authActions.login(data.idToken))

                 history('/ExpenseItem');
                 

                console.log(data.idToken)


            alert("Login SuccessFully")
        });

        }
    }
   

  
    return(

        <Row style={{margin:"10% 0 0 20%"}}>
            <Col md={6}>
                <Card>
                    <Card.Header className="p-3" style={{backgroundColor:"darkGrey",textAlign:"center"}}>
                    <h4 >{isLogin?'Sign Up':'Login'}</h4>
                    </Card.Header>

                    <Card.Body className="p-5" style={{backgroundColor:"#f7f5f0"}}>
                    <Form>

                   

                        <Form.Group   className="mb-3">
                            <Form.Control size="lg" type="email" placeholder="email" name="email" value={email} onChange={EmailInput}  ></Form.Control>
                            </Form.Group>
                        { <Form.Group className="mb-3">
                            <Form.Control size="lg" type="password" placeholder="Password" name="password"  value={password} onChange={PasswordInput} ></Form.Control>
                        </Form.Group>}
                       {isLogin &&  <Form.Group className="mb-3">
                            <Form.Control size="lg" type="password" placeholder="Password" name="password" value={Confirm} onChange={updatePasswordInput}  ></Form.Control>
                        </Form.Group>}
                          {!isLogin && <Card.Body className="mt-3">
                    <p style={{backgroundColor:"pink",textAlign:"center",padding:"10px"}}><span style={{cursor:"pointer",color:"blue"}} onClick={Forgot}> Forgot password ?</span></p>
                  
                </Card.Body>}
                
                        <Form.Group className="mb-1">
                        <Container  style={{textAlign:"center"}}>
                         <Button  size='lg' variant="success"  type="submit"  style={{borderRadius:"40px",cursor:"pointer"}} onClick={Submit} disabled={!formIsValid}>{isLogin?'Signup':'Login'}</Button>
                          </Container>

                        </Form.Group>
                      
                    </Form>
                    </Card.Body>
                </Card>
                <Card.Body className="mt-3">
                    <p style={{backgroundColor:"pink",textAlign:"center",padding:"10px",}}>have an account ? <span style={{cursor:"pointer",color:"blue"}} onClick={SwitchHandler}>{isLogin?'Login':'Signup'}</span></p>
                  
                </Card.Body>

            </Col>

        </Row>


    )
}
export default SignUp;