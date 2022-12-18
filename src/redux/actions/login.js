import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublicInstance } from "../../services/axios";

export const login = createAsyncThunk(
    'login', 
    async ({user, pwd}, {rejectWithValue}) =>{
      try{
        const response = await axiosPublicInstance.post('/auth', {user, pwd});
        return response.data;
      }
      catch(error){
        if (error.response && error.response.data.message){
          return rejectWithValue(error.response.data.message);
        }
        else{
          return rejectWithValue(error.message);
        }
      }
    }
);