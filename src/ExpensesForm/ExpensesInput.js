import { useState } from 'react';

import{Row,Col,Form,Card,Button,Container} from 'react-bootstrap'


const ExpenseForm = (props) => {
const [enteredExpense,setEnteredExpense]=  useState('')
const [enteredDetails,setEnteredDetails] = useState('')
const [enteredCategory,setEnteredCategory] = useState('')
const [enteredData,setEnteredData]=useState([]);


const expenseHandler  =(event) =>{
 


  setEnteredExpense(event.target.value)  
}
const detailsHandler=(event)=>{
  

    setEnteredDetails(event.target.value)  
}
const categoryHandler =(event)=>{

    setEnteredCategory(event.target.value)  
}
const SubmitHandler = (event) =>{
event.preventDefault()

const obj = {
    enteredExpense,
    enteredDetails,
    enteredCategory
}


setEnteredData((prevexpense)=>{
  return [...prevexpense,obj]
})


}

  return (
    <>
     <Row style={{margin:"2% 0  0  3%"}}>
            <Col md={6}>
                <Card>
                    <Card.Header className="p-1" style={{backgroundColor:"darkGrey",textAlign:"center"}}>
                    <h4 >Expense-Form</h4>
                    </Card.Header>

                    <Card.Body className="p-2" style={{backgroundColor:"#f7f5f0"}}>
                    <Form>

                   

                        <Form.Group   className="mb-1">
                            <Form.Control size="lg" type="number" placeholder="amount" name="amount" onChange={expenseHandler}  ></Form.Control>
                            </Form.Group>
                         <Form.Group className="mb-2">
                            <Form.Control size="lg" type="text" placeholder="discription" name="discription"  onChange={detailsHandler}></Form.Control>
                             </Form.Group>

                             
                         <Form.Group className="mb-1">
                          <Form.Label style={{fontWeight:"bold",marginRight:"30px"}}>Category</Form.Label>

                            <select onChange={categoryHandler} value={enteredCategory} style={{width:"80%"}} >
                                <option>Food</option>
                                <option>Petrol</option>
                                <option>Salary</option>
                                <option>Travlling</option>
                                <option>Study</option>
                                <option>House Keeping</option>
                            </select>
                        </Form.Group>
                                
                         
               
                        <Form.Group className="mb-1">
                        <Container  style={{textAlign:"center"}}>
                         <Button  size='lg' variant="success"  type="submit"  style={{borderRadius:"40px"}} onClick={SubmitHandler}>Submit</Button>
                          </Container>

                        </Form.Group>
                      
                    </Form>
                   </Card.Body>
                    </Card>
         </Col>

        </Row>

        {enteredData.map((item)=>{return<li>
        <span>{item.enteredExpense}</span>
         <span>{item.enteredDetails}</span> 
          <span> {item.enteredCategory}</span></li>})}
      
      

    </>
  )
};
export default ExpenseForm;