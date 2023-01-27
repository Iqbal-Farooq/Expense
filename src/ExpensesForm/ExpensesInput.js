import { useState,useEffect, useRef } from 'react';
import axios from 'axios';

import{Row,Col,Form,Card,Button,Container} from 'react-bootstrap'
import { expenseActions,themeAction } from '../AUth/AuthContext';
import { useDispatch,useSelector } from 'react-redux';
// import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";



const ExpenseForm = (props) => {
  // const [length,Setlength]=useState(false);
const [enteredData,setEnteredData]=useState([]);
const[render,setRender]=useState(false);
// if(Object.values(Expensedata.expenses).length>0){
//   setRender(true)
// }else{
//   setRender(false)
// }


const formatedEmail=localStorage.getItem('email').replace(".", "").replace("@", "");
const  ExpenseAmount=useRef();
const   ExpenseDisc=useRef();
const  ExpenseCat=useRef();

const Expensedata=useSelector(state=>state.expense)
const dispatch=useDispatch();
const currentTheme=useSelector(state=>state.theme);
console.log("theme",currentTheme);
// if(enteredData.length>0){
//   Setlength(true)
//   console.log(enteredData.length)
// }


  async function GetDate(){
    let res=await axios.get(`https://expense-tracker-e38a4-default-rtdb.firebaseio.com/expenseItems${formatedEmail}.json`);
    
    const data= await res.data;

    console.log("INSIDE useuEFFEct",data);
   
    //  setEnteredData(data);

     dispatch(expenseActions.onAddOrGetExpense(data))
      
  
  }

useEffect(()=>{

  GetDate()
},[])


async function SubmitHandler (event ){
  event.preventDefault();
//   let index=enteredData.findIndex(item=>Object.keys(item)===expenseId) ;
//   console.log(index);
  let enteredamount=ExpenseAmount.current.value;
 let entereddisc=ExpenseDisc.current.value;
 let enteredcate=ExpenseCat.current.value;

const obj = {
  amount:enteredamount,
  disc:entereddisc,
  cate:enteredcate
 

}

  // if(index>=0){
  //   const res=await axios.put(`https://expense-tracker-e38a4-default-rtdb.firebaseio.com/expenseItems/${index}.json`,obj);
  //   let data=await res.data;

  // }else{
    
let res=await axios.post(`https://expense-tracker-e38a4-default-rtdb.firebaseio.com/expenseItems${formatedEmail}.json`,obj);
let data=await res.data;
console.log("DATA FINDING",data)

  // }

 ;


// setEnteredData(prev=>{return  {...prev,obj}})

  GetDate();


  

}

async function onExpenseDeleteClickHandler(id){

  const res=await axios.delete(`https://expense-tracker-e38a4-default-rtdb.firebaseio.com/expenseItems${formatedEmail}/${id}.json`);
  const data= await res.data;
  console.log("SuccessFully");
   GetDate();

}
 const onEditExpenseClickHandler = (expenseId) => {

    ExpenseAmount.current.value = Expensedata.expenses[expenseId].amount;
    ExpenseDisc.current.value = Expensedata.expenses[expenseId].disc;
    ExpenseCat.current.value = Expensedata.expenses[expenseId].cate;

  //  SubmitHandler(expenseId);

    onExpenseDeleteClickHandler(expenseId);
    GetDate();
  }
  
      let sumOfExpense = 0;

        Object.values(Expensedata.expenses).forEach((item) => {
          sumOfExpense += Number(item.amount);
        });
        console.log(sumOfExpense)


        const downloading=()=>{
         const csv = Object.keys(Expensedata.expenses).map((expense) => {
      // return ["Col1", "Col2", "Col3"]
      console.log(expense[1].amount);
      return [expense[1].amount, expense[1].description, expense[1].category];
    });

    console.log(csv);
    const makeCSV = (rows) => {
      return rows.map((r) => r.join(",")).join("\n");
    };

    const blob1 = new Blob([makeCSV(csv)]);


    const temp = URL.createObjectURL(blob1)
    saveAs(temp, "file1.txt")
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
        <div style={{marginTop:"30px",backgroundColor: currentTheme.darkMode? "grey" : null}}>  

       {   Object.keys(Expensedata.expenses).map((key)=>{ 
        return  <div style={{marginTop:"15px"} }><li key={key}>
         <span style={{margin:"1px 3px 1px 1px",}}>{Expensedata.expenses[key].amount}</span>
            <span style={{margin:"1px 3px 1px 10px"}}>{Expensedata.expenses[key].disc}</span> 
            <span style={{margin:"1px 10px 1px 10px"}}>{Expensedata.expenses[key].cate}</span>
             <span style={{margin:"6px 15px 1px 1px"}}> <Button size='sm' variant='success' onClick={()=>{onEditExpenseClickHandler(key)}}>Edit</Button></span>
            <span style={{margin:"6px 10px 1px 1px"}}><Button size='sm' variant='danger' onClick={()=>{onExpenseDeleteClickHandler(key)}}>Delete</Button> </span>

             </li>
            
            
            </div>
           
         
            }) 
        } 
         {console.log((Expensedata.expenses))}
          {sumOfExpense>=1000 ?<span onClick={()=>dispatch(themeAction.changeTheme())} style={{color:"blue"}}>Active premium</span>:''}
          <button onClick={downloading}>Download</button>

    
 
         </div>
    </>
  )
};
export default ExpenseForm;