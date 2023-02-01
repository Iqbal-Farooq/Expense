import { useState,useEffect, useRef } from 'react';
import axios from 'axios';

import{Row,Col,Form,Card,Button,Container} from 'react-bootstrap'
import { expenseActions,themeAction } from '../AUth/AuthContext';
import { useDispatch,useSelector } from 'react-redux';

import { saveAs } from "file-saver";



const ExpenseForm = (props) => {

const formatedEmail=localStorage.getItem('email').replace(".", "").replace("@", "");
const  ExpenseAmount=useRef();
const   ExpenseDisc=useRef();
const  ExpenseCat=useRef();

const Expensedata=useSelector(state=>state.expense)

const dispatch=useDispatch();
const currentTheme=useSelector(state=>state.theme);
console.log("theme",currentTheme);

async function GetDate(){
    let res=await axios.get(`https://expense-tracker-e38a4-default-rtdb.firebaseio.com/expenseItems${formatedEmail}.json`);

    const data= await res.data;


     dispatch(expenseActions. addorDeleteExpense(data))

  }

useEffect(()=>{

  GetDate()
},[])

 let exist=false;
    let expId;
     const onEditExpenseClickHandler = (expenseId) => {

    ExpenseAmount.current.value = Expensedata.expenses[expenseId].amount;
    ExpenseDisc.current.value = Expensedata.expenses[expenseId].disc;
    ExpenseCat.current.value = Expensedata.expenses[expenseId].cate;
     exist=true;
     expId=expenseId;
    console.log("esp",expId)
    
  }
 
async function SubmitHandler (event ){
  event.preventDefault();

  console.log("adding inside put request")
  console.log(exist);
  console.log(expId)

  let enteredamount=ExpenseAmount.current.value;
 let entereddisc=ExpenseDisc.current.value;
 let enteredcate=ExpenseCat.current.value;

const obj = {
  amount:enteredamount,
  disc:entereddisc,
  cate:enteredcate
 

}

  if(exist){
    const res=await axios.put(`https://expense-tracker-e38a4-default-rtdb.firebaseio.com/expenseItems${formatedEmail}/${expId}.json`,obj);
    let data=await res.data;

  }
  else{
    
let res=await axios.post(`https://expense-tracker-e38a4-default-rtdb.firebaseio.com/expenseItems${formatedEmail}.json`,obj);
let data=await res.json;

console.log("DATA FINDING",data);

  }
   await GetDate();

   ExpenseAmount.current.value="";
  ExpenseDisc.current.value="";
 ExpenseCat.current.value="";


 exist=false;
  
}


async function onExpenseDeleteClickHandler(id){

  const res=await axios.delete(`https://expense-tracker-e38a4-default-rtdb.firebaseio.com/expenseItems${formatedEmail}/${id}.json`);
  const data= await res.data;
  console.log("SuccessFully");
   GetDate();

}

  
      let sumOfExpense = 0;

      if(Expensedata.expenses !==null){
          Object.values(Expensedata.expenses).forEach((item) => {
          sumOfExpense += Number(item.amount);
        });
        console.log(sumOfExpense);

      }

      


        const downloading=()=>{
         const csv = Object.entries(Expensedata.expenses).map((expense) => {
     
      return [expense[1].amount, expense[1].disc,expense[1].cate];
    });

    console.log(csv);
    const makeCSV = (rows) => {
      return rows.map((r) =>  r.join(" - ")).join("\n");
    };

    const blob1 = new Blob([makeCSV(csv)]);


    const temp = URL.createObjectURL(blob1)
    saveAs(temp,"file1.txt")
        }


return (
    <div style={{backgroundColor: currentTheme.darkMode? "grey" : null}}>
     <Row style={{margin:"2% 0  0  3%"}}>
            <Col md={6}>
                <Card>
                    <Card.Header className="p-1" style={{backgroundColor:"darkGrey",textAlign:"center"}}>
                    <h4 >Expense-Form</h4>
                    </Card.Header>

                    <Card.Body className="p-2" style={{backgroundColor:"#f7f5f0"}}>
                    <Form>
    <Form.Group   className="mb-1">
                            <Form.Control size="lg" type="number" placeholder="amount" name="amount" ref={ExpenseAmount}  ></Form.Control>
                            </Form.Group>
                         <Form.Group className="mb-2">
                            <Form.Control size="lg" type="text" placeholder="discription" name="discription"  ref={ExpenseDisc}></Form.Control>
                             </Form.Group>

                         <Form.Group className="mb-1">
                          <Form.Label style={{fontWeight:"bold",marginRight:"30px"}}>Category</Form.Label>

                            <select ref={ExpenseCat} style={{width:"80%"}} >
                                <option>Food</option>
                                <option>Sports</option>
                                <option>Salary</option>
                                <option>Travelling</option>
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
        <div id='div'  style={{marginTop:"30px",backgroundColor: currentTheme.darkMode? "grey" : null}}>  

       { Expensedata.expenses!==null &&  Object.keys(Expensedata.expenses).map((key)=>{ 
        return  <div id={key} style={{marginTop:"15px"} }><li  key={key}>
         <span style={{margin:"1px 3px 1px 1px",}}>{Expensedata.expenses[key].amount}</span>
            <span style={{margin:"1px 3px 1px 10px"}}>{Expensedata.expenses[key].disc}</span> 
            <span style={{margin:"1px 10px 1px 10px"}}>{Expensedata.expenses[key].cate}</span>
             <span style={{margin:"6px 15px 1px 1px"}}> <Button size='sm' variant='success' onClick={()=>{onEditExpenseClickHandler(key)}}>Edit</Button></span>
            <span style={{margin:"6px 10px 1px 1px"}}><Button size='sm' variant='danger' onClick={()=>{onExpenseDeleteClickHandler(key)}}>Delete</Button> </span>
            {/* <span>{key}</span>
            {console.log(key)} */}

             </li>

            </div>
    }) 
        } 
         {/* {console.log((Expensedata.expenses))}
         {console.log((Expensedata.expenses !== null))} */}
        
         <div  style={{marginTop:"30px",}}> 
          {sumOfExpense>=10000 &&<span onClick={()=>dispatch(themeAction.changeTheme())} style={{color:"blue",marginRight:"30px",marginLeft:"10px",cursor:"pointer"}}>Active premium</span>}

         {sumOfExpense>=10000 && <Button size='sm'  variant='success' onClick={downloading}>Download</Button>}

         </div>

         
       </div>
    </div>
  )
};
export default ExpenseForm;