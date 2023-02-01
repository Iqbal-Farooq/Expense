


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
      state.isLoggedin=true;
    },
    logout(state,action){
         state.token=action.payload;
      state.isLoggedin=false;
        localStorage.removeItem('token');
        localStorage.removeItem('email');

    },

  },
});
const initialExpenseState = {
  expenses: [],
 
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    addorDeleteExpense(state, action) {
        state.expenses = action.payload
    },
   
  },
});

const initialThemeState={

  darkMode:false,
 

}
const ThemeSlice = createSlice({
  name:'theme',
  initialState:initialThemeState,
  reducers:{
    changeTheme(state){
      
      state.darkMode=!state.darkMode;

    },
   
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