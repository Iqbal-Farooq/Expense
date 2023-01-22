import { useRef} from 'react'


import { useHistory } from 'react-router-dom';
import {Col,Row,Form,Card,Container,Button} from 'react-bootstrap'

const Forgot=()=>{
    const EmailRef=useRef();
    const history=useHistory();

    const Signup=(e)=>{
        e.preventDefault();
        history.replace("/");


    }
    const PasswordHandler=(e)=>{
        e.preventDefault();
        const Email=EmailRef.current.value;

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y",{
            method:"POST",
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:Email,
            }), headers:{
    'Content-Type': "application/json"
},}).then(res=>{
    if(res.ok){
        return res.json()
    }else{
        return res.json().then(data=>{console.log(data) 
            alert(data.error.message)})
    }

}).then(data=>{console.log(data)
alert("Sent Successfully")}).catch(err=>{console.log(err)})
    }

    

    return (<>
     <Row style={{margin:"10% 0 0 20%"}}>
            <Col md={6}>
                <Card>
                    <Card.Header className="p-3" style={{backgroundColor:"darkGrey",textAlign:"center"}}>
                    <h4 >Forgot-Password</h4>
                    </Card.Header>

                    <Card.Body className="p-5" style={{backgroundColor:"#f7f5f0"}}>
                    <Form>

                  

                        <Form.Group   className="mb-3">
                        <Form.Label>Enter the Registered Email</Form.Label>
                            <Form.Control size="lg" type="email" placeholder="email" name="email" ref={EmailRef}  ></Form.Control>
                            </Form.Group>
                       
                    
                        <Form.Group className="mb-1">
                        <Container  style={{textAlign:"center"}}>
                         <Button  size='lg' variant="success"  type="submit" className='' style={{borderRadius:"40px"}} onClick={PasswordHandler} >Send-Link</Button>
                          </Container>

                        </Form.Group>
                      
                    </Form>
                    </Card.Body>
                </Card>
                <Card.Body className="mt-3">
                    <p style={{backgroundColor:"pink",textAlign:"center",padding:"10px"}}>have an account ? <span onClick={Signup} >Login</span></p>
                  
                </Card.Body>

            </Col>

        </Row>


    </>)
}
export default Forgot;