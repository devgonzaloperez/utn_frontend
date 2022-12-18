import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublicInstance } from "../../services/axios";

export const logout = createAsyncThunk(
    'logout', 
    async (args = {}, {rejectWithValue}) =>{
      try{
        const response = await axiosPublicInstance.get('/logout');
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