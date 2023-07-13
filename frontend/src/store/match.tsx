import { createSlice } from "@reduxjs/toolkit";

const matchInitialState = { matchData: {} };
const matchSlice = createSlice({
    name: "match",
    initialState: matchInitialState,
    reducers: {
        update(state, action) {
            state.matchData = action.payload;
        }
    }
});

export default matchSlice;

export const matchActions = matchSlice.actions;