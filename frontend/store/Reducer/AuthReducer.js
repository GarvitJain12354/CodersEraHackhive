import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    name:"Hackhive",
    isAuthenticated : false
}

export const Auth = createSlice({
    name:"HackHive",
    initialState,
    reducers:{

    }
});

export const  {} = Auth.actions;
export default Auth.reducer;