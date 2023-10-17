import { createSlice } from "@reduxjs/toolkit";
const user={
    user_id:"",
}

const LoginState = {
    isLogged:false,
    user:user,
    token:"",
  };
  

  const loginSlice=createSlice({
    name:"login",
    initialState:LoginState,
    reducers:{
        LoginAction:(state,action)=>{
            const expirationTime = new Date().getTime() + 60 * 60 * 1000;

            localStorage.setItem('expirationTime', expirationTime);         
            setTimeout(() => {
            localStorage.removeItem('expirationTime');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            console.log('Value has expired.');
            }, 60 * 60 * 1000); 
            localStorage.setItem('user',action.payload.userId);
            localStorage.setItem('token',action.payload.token);
        },
        LogoutAction:(state,action)=>{
            localStorage.removeItem('expirationTime');
            localStorage.removeItem('user');
            localStorage.removeItem('token');  
        },
    },
  })

  export const {LoginAction,LogoutAction} =loginSlice.actions

  export default loginSlice.reducer;