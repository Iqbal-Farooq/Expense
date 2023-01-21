
import React, { createContext,useState } from 'react'
export const AuthContext=React.createContext({
    isLogin:false,
    Login:(token)=>{},
    Logout:()=>{},
    tokenid:'',
})

const AuthProvider=(props)=>{
   const initialtoken= localStorage.getItem('token')
    const [Token,SetToken]=useState(initialtoken);

    const UserIslogedIn=!!Token;

    const LoginHandler=(token)=>{
        console.log("insiDe Token",token)
        localStorage.setItem('token',token);
        SetToken(token);
        
    }

    const LogOutHandler=()=>{
        localStorage.removeItem('token')
        SetToken(null);
        
    }




    const Authcontext={
        isLogin:UserIslogedIn,
        Login:LoginHandler,
        Logout:LogOutHandler,
        tokenid:Token, 


    }

    return<AuthContext.Provider value={Authcontext}>
    {props.children}
    </AuthContext.Provider>
     
}
export default AuthProvider;