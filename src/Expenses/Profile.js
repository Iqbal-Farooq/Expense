import { useRef,useContext,useEffect,useState} from "react";
import { AuthContext, } from "../AUth/AuthContext";
import { useHistory } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

const Profile=()=>{
    const [Profile,SetProfile]=useState(null);
     const [Photourl,SetPhotoUrl]=useState(null);
      const NameRef=useRef();
    const UrlRef=useRef();
    const ctx=useContext(AuthContext);
    const history=useHistory();
  

    const ChangeEventHAndler=()=>{
        history.replace('./ExpenseItem');

      

    }


    useEffect(()=>{
        
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y',{
            method:"POST",
            body:JSON.stringify({
                idToken:ctx.tokenid}),
                headers:{
    'Content-Type': "application/json"
},
        }).then(res=>{
                if(res.ok){
                    return res.json()
                }
                else{
                    return res.json().then(data=>{console.log(data)
                    alert(data.error.message)})
                }
            }).then(data=>{console.log(data.users)
                SetProfile(data.users[0].displayName);
                SetPhotoUrl(data.users[0].photoUrl);
                console.log(data.users[0].displayName)
                console.log(data.users[0].photoUrl)
           }).catch(err=>console.log(err));
    },[])
  


    const SendData=(e)=>{
        e.preventDefault();
        console.log(NameRef.current.value);
        console.log(UrlRef.current.value,ctx.tokenid)
        const name=NameRef.current.value;
        const Url=UrlRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y',{
            method:"POST",
            body:JSON.stringify({
                idToken:ctx.tokenid,
                displayName:name,
                photoUrl:Url,
                returnSecureToken:true,


            }),headers:{
    'Content-Type': "application/json"
},

        }).then(res=>{
                if(res.ok){
                    return res.json()
                }
                else{
                    return res.json().then(data=>{console.log(data)
                    alert(data.error.message)})
                }
            }).then(data=>console.log(data),alert("SUCCESS")).catch(err=>console.log(err));

    }
    


    return (<>
        <Navbar>
          {<p>Winners Never Quit,Quitters Never Win </p>}
    {<p className="top1"> Your profile is 64% completes. A complete Profile has Higher chances
          of landing a job.</p>} </Navbar>
            <hr />

             { <div  > 
       <div className="Form"> 
       <h4>Contact Details</h4>
       <button onClick={ChangeEventHAndler} className="btnClr">cancel</button>
       </div>
       <div className="Input1"> 
       <div>
       <label className="LAbel" >FULL NAME : </label>
       <input  type='text' placeholder="FullName"  ref={NameRef} defaultValue={Profile} ></input>
       </div>
        <div> 
         <label className="LAbel">Profile Photo Url :</label>
         <input  type='text' placeholder="URL" ref={UrlRef}  defaultValue={Photourl}></input>

          </div>
       </div>
        
          <div className="btn"><button className="btnClr"  onClick={SendData} >update</button></div>
          <hr className="Line"/>


        </div>}
    </>)

}
export default Profile;