import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { axiosInstance } from '@/apis'

// Define a type for the slice state
export interface userState {
    chatUserData: any
}

// Define the initial state using that type
const initialState: userState = {
    chatUserData: {},
}

export const chatSlice = createSlice({
    name: 'chat',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setChatUser: (state, action: PayloadAction<number>) => {
            state.chatUserData = action.payload
        },
    },
})

export const { setChatUser } = chatSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.business.value

export default chatSlice.reducer