import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/login';
import { logout } from '../actions/logout';

const initialState = {
    loading: false,
    errorMessage: null,
    user: null,
    roles: null,
    accessToken: null //refreshToken is in cookies.
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setErrorMessage: (state, action) => state.errorMessage = action.payload,
    cleanErrorMessage: (state) => state.errorMessage = null,
    setAccessToken: (state, action) => ({...state, accessToken: action.payload}), //I use it only in /refresh.
  },
  extraReducers: {
    //Login
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.errorMessage = null;
      state.user = payload.user;
      state.roles = payload.roles;
      state.accessToken = payload.accessToken;
    },
    [login.rejected]: (state, {payload}) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    //Logout
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state) => {
      state.loading = initialState.loading;
      state.errorMessage = initialState.errorMessage;
      state.user = initialState.user;
      state.roles = initialState.roles;
      state.accessToken = initialState.accessToken;
    },
    [login.rejected]: (state, {payload}) => {
      state.loading = false;
      state.errorMessage = payload;
    }
  }
});

export const { setErrorMessage, cleanErrorMessage, setAccessToken } = authSlice.actions; //Login outside because is an extra reducer.