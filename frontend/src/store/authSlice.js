import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../services/axiosInstance';

    export const signIn = createAsyncThunk(
      'auth/signIn',
      async (loginData, { rejectWithValue }) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/user/signin`,
            loginData,
            { withCredentials: true }
          );
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data || { error: 'Sign in failed' });
        }
      }
    );

    export const verifyEmail = createAsyncThunk(
      'auth/verifyEmail',
      async ({ email, otp }, { rejectWithValue }) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/verify-email`, 
            { email, otp }, 
            { withCredentials: true });
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data || { error: 'Verification failed' });
        }
      }
    );

    export const getSupplierProfile = createAsyncThunk(
        'auth/getSupplierProfile',
        async (_, { rejectWithValue }) => {
          try {
            const response = await axiosInstance.get(
              `${import.meta.env.VITE_BASE_URL}/supplier/profile`,
              { withCredentials: true }
            );
            return response.data; 
          } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Fetching profile failed' });
          }
        }
      );

      export const logoutUser = createAsyncThunk(
      'auth/logoutUser',
      async (_, { rejectWithValue, dispatch, getState }) => {
        try {
          let role = localStorage.getItem("userRole");

          if (!role) {
            if (getState().auth?.buyer) role = "buyer";
            else if (getState().auth?.supplier) role = "supplier";
          }
                  
          if (!role) {
            throw new Error("User role not found. Cannot logout.");
          }
        
          const endpoint =
            role === "supplier"
              ? `${import.meta.env.VITE_BASE_URL}/supplier/logout`
              : `${import.meta.env.VITE_BASE_URL}/buyer/logout`;
        
          const response = await axiosInstance.post(endpoint, {}, { withCredentials: true });
        
          // Clear localStorage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userRole");
        
          // Reset store state
          dispatch(logout());
         
          return response.data;
        } catch (error) {
          console.log(error)
          return rejectWithValue(error.response?.data || { error: 'Logout failed' });
        }
      }
    );
     
      export const getBuyerProfile = createAsyncThunk(
      'auth/getBuyerProfile',
      async (_, { rejectWithValue }) => {
        try {
          const response = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL}/buyer/profile`,
            { withCredentials: true }
          );
          console.log("get Buyer Profile: ",response.data)
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data || { error: 'Fetching buyer profile failed' });
        }
      }
    );

    const initialState = {
      buyer: null,
      supplier: null,
      accessToken: null,
      loading: false,
      error: null,
    };

    const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
        logout: (state) => {
          state.buyer = null;
          state.supplier = null;
          state.accessToken = null;
          state.error = null;
        },
        setSupplier: (state, action) => {
          state.supplier = action.payload;
        },
        setBuyer: (state, action) => {
        state.buyer = action.payload;
     }
      },
      extraReducers: (builder) => {
      builder

      //-------- Signin  ----------
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        const { user, accessToken, role } = action.payload;
      
        if (accessToken && role) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userRole", role)
          state.accessToken = accessToken;
        }
      
        if (role === 'buyer') {
          state.buyer = user;
        } else if (role === 'supplier') {
          state.supplier = user;
        } 
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Sign in failed';
      })

        //-------- Register ----------
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        const { user, accessToken, role } = action.payload;
        if (accessToken && role) {
           localStorage.setItem("accessToken", accessToken);
           localStorage.setItem("userRole", role)
        }
        if (role === 'buyer') {
          state.buyer = user;
        } else if (role === 'supplier') {
          state.supplier = user;
        } 
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Verification failed';
      })

      // get supplier profile
      .addCase(getSupplierProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSupplierProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.supplier = action.payload;
      })
      .addCase(getSupplierProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Could not fetch supplier profile';
      })

      // Buyer profile
      .addCase(getBuyerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBuyerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.buyer = action.payload;
      })
      .addCase(getBuyerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Could not fetch buyer profile';
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.buyer = null;
        state.supplier = null;
        state.accessToken = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Logout failed';
      });
      },
    });
    

    export const { logout, setSupplier, setBuyer } = authSlice.actions;
    export default authSlice.reducer;
