
import React, { createContext,useState } from 'react'
export const AuthContext=React.createContext({
    isLogin:false,
    Login:(token)=>{},
    Logout:()=>{},
    tokenid:'',
    profileDetails:'',
     profile:'',
})

const AuthProvider=(props)=>{
   const initialtoken= localStorage.getItem('token')
    const [Token,SetToken]=useState(initialtoken);
    const[Profile,setProfile]=useState([]);

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
    const ProfileHandler=(data)=>{
        console.log("profileHAndler",data)
        setProfile(data)
        
    }




    const Authcontext={
        isLogin:UserIslogedIn,
        Login:LoginHandler,
        Logout:LogOutHandler,
        tokenid:Token,
        profileDetails:ProfileHandler, 
        profile:Profile,


    }

    return<AuthContext.Provider value={Authcontext}>
    {props.children}
    </AuthContext.Provider>
     
}
export default AuthProvider;