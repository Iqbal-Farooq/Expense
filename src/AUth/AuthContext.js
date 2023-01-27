
// import React, { createContext,useState } from 'react'
// export const AuthContext=React.createContext({
//     isLogin:false,
//     Login:(token)=>{},
//     Logout:()=>{},
//     tokenid:'',
//     profileDetails:'',
//      profile:'',
// })

// const AuthProvider=(props)=>{
//    const initialtoken= localStorage.getItem('token')
//     const [Token,SetToken]=useState(initialtoken);
//     const[Profile,setProfile]=useState([]);

//     const UserIslogedIn=!!Token;

//     const LoginHandler=(token)=>{
//         console.log("insiDe Token",token)
//         localStorage.setItem('token',token);
//         SetToken(token);
        
//     }

//     const LogOutHandler=()=>{
//         localStorage.removeItem('token')
//         SetToken(null);
        
//     }
//     const ProfileHandler=(data)=>{
//         console.log("profileHAndler",data)
//         setProfile(data)
        
//     }




//     const Authcontext={
//         isLogin:UserIslogedIn,
//         Login:LoginHandler,
//         Logout:LogOutHandler,
//         tokenid:Token,
//         profileDetails:ProfileHandler, 
//         profile:Profile,


//     }

//     return<AuthContext.Provider value={Authcontext}>
//     {props.children}
//     </AuthContext.Provider>
     
// }
// export default AuthProvider;



// import { createSlice,configureStore } from '@reduxjs/toolkit';
// const initialIdToken = localStorage.getItem("token");

// const InitialAuthState={
//   token: initialIdToken,
//   isLoggedIn: !!initialIdToken,
// }

// const AuthSlice=createSlice({
//     name:"Authentiction",
//     initialState:InitialAuthState,
//     reducers: {
//     login(state, action) {
//       state.token = action.payload;
//       state.isLoggedIn = true;
     
//     },
//      logout(state, action) {
     
//       state.token = action.payload;
//       state.isLoggedIn = false;
//       localStorage.removeItem("token");
//       localStorage.removeItem("email");
//       localStorage.removeItem("data");
//     },

    


// }

// });

// const initialExpenseState = {
//   expense: [],
// //   totalAmount:0,

// };
// const ExpenseSlice = createSlice({
//   name: "expense",
//   initialState: initialExpenseState,
//   reducers: {
//     fetchAllexpenses(state, action) {
//       state.expense = action.payload;
//     },

   
//   },
// });

// const store = configureStore({
//     reducer: {
//     auth: AuthSlice.reducer,expenseitem: ExpenseSlice.reducer}
// });

//  AuthenticationAction=AuthSlice.actions;
// export ExpenseAction=ExpenseSlice.actions;


// export default store;



import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const initialToken=localStorage.getItem('token');

const initialAuthState = {
  token: initialToken,
  isLoggedin:!!initialToken,
};



const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
        localStorage.setItem('token',action.payload)
      state.token = action.payload;
    },
    logout(state,action){
         state.token=action.payload;
        // let token=action.payload;
        state.isLoggedin=false;
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        // localStorage.remove('data')
       
    }
  },
});
const initialExpenseState = {
  expenses: [],
  totalamount:0,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    onAddOrGetExpense(state, action) {
        state.expenses = action.payload
    },
    totalExpense(state) {
        
       let amount= state.expenses.forEach((amount,item)=>{amount+=item.amount},0)
        // console.log(`total expense`,state.totalamount)
        console.log(amount);
    }
  },
});

// const initialThemeState = {
//   darkTheme: false,
// };
// const ThemeSlice=createSlice({
//     name:"theme",
//     initialState:initialThemeState,
//     reducers:{
//          onThemeChange(state) {
//         console.log(`inside onThemeChange`)
//       state.darkTheme = !state.darkTheme;
//     },
//     }
// })


const initialThemeState={

  darkMode:false,
  premium:false,
  cvandDark:false,

}
const ThemeSlice = createSlice({
  name:'theme',
  initialState:initialThemeState,
  reducers:{
    changeTheme(state,action){
      //state.darkMode = 'light'
      state.darkMode=!state.darkMode;

    },
    activePremium(state,action){
       state.premium=action.payload;
    },
    cvDarkMode(state,action){
      state.cvandDark=action.payload;
    }
  }
})

const store = configureStore({
  reducer: {
     auth: authSlice.reducer,
      expense: expenseSlice.reducer,
      theme:ThemeSlice.reducer,
      
     },
});

export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;
export const themeAction=ThemeSlice.actions;
export default store;