import { createSlice } from "@reduxjs/toolkit";


const initialState={
    currrentUser:null,
    error:null,
    loading:false
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInstart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currrentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart: (state)=>{
            state.loading=true;
        },
        updateUserSuccess: (state,action)=>{
            state.currrentUser =action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure: (state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserSuccess: (state,action)=>{
            state.currrentUser =null;
            state.loading=false;
            state.error=null;
        },
        deleteUserFailure: (state,action)=>{
            state.currrentUser =action.payload;
            state.loading=false;
            state.error=null;
        },
        signOutUserStart: (state)=>{
            state.loading=true;
        }
        ,signOutUserSuccess: (state,action)=>{
            state.currrentUser =null;
            state.loading=false;
            state.error=null;
        },
        signOutUserFailure: (state,action)=>{
            state.currrentUser =action.payload;
            state.loading=false;
            state.error=null;
        },
        signOutUserStart: (state)=>{
            state.loading=true;
        }

        }
})

export const {signInstart,signInFailure,signInSuccess,updateUserFailure,
             updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,
             deleteUserSuccess,signOutUserFailure,signOutUserStart,
             signOutUserSuccess}=userSlice.actions;

export default userSlice.reducer;