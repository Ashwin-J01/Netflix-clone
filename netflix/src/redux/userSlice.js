import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        isLoading:false,
        isSubscribed:false,
        subscriptionTier:'none'
    },
    reducers:{
        // actions
        setUser:(state,action)=>{
            state.user = action.payload;
            state.isSubscribed = !!action.payload?.isSubscribed;
            state.subscriptionTier = action.payload?.subscriptionTier || 'none';
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload;
        },
        setSubscription:(state,action)=>{
            const { isSubscribed, subscriptionTier } = action.payload;
            state.isSubscribed = isSubscribed;
            state.subscriptionTier = subscriptionTier;
            if (state.user) {
                state.user.isSubscribed = isSubscribed;
                state.user.subscriptionTier = subscriptionTier;
            }
        }
    }
});
export const {setUser,setLoading,setSubscription} = userSlice.actions;
export default userSlice.reducer;