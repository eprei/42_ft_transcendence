import { createSlice } from '@reduxjs/toolkit'

const chatInitialState = { currentChatSelected: 0 }
const chatSlice = createSlice({
    name: 'chat',
    initialState: chatInitialState,
    reducers: {
        selectChat(state, action) {
            state.currentChatSelected = action.payload
        },
    },
})

export default chatSlice

export const chatActions = chatSlice.actions