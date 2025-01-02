import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    currentVendor: null,
    error: null,
    loading: false
};

const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        refreshVendorSignIn: (state) => {
            state.loading = false;
            state.error = null;
            state.currentVendor = null;
        },
        signInVendorStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInVendorSuccess: (state, action) => {
            state.currentVendor = action.payload;
            state.loading = false;
        },
        signInVendorFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signoutVendorSuccess: (state) => {
            state.currentVendor = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const { signInVendorStart, signInVendorSuccess, signInVendorFailure, signoutVendorSuccess,refreshVendorSignIn } = vendorSlice.actions;
export default vendorSlice.reducer;