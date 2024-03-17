import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    name:"Hackhive",
    isAuthenticated : false
}

export const Auth = createSlice({
    name:"HackHive",
    initialState,
    reducers:{
getSearchSuccess:(state,action)=>{
    state.searchData = action.payload.vichel.data
}
    }
});

export const  {getSearchSuccess} = Auth.actions;
export default Auth.reducer;