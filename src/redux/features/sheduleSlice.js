import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shedule: null,
  startShedule: null,
  groupId: null,
}

const sheduleSlice = createSlice({
  name: "shedule",
  initialState,
  reducers: {
    setGroupId: (state, action) => {
      state.groupId = action.payload;
    },
    setShedule: (state, action) => {
      state.shedule = action.payload;
      state.startShedule = action.payload;
    },
    changeShedule: (state, action) => {
      state.shedule[action.payload.day][action.payload.index] = action.payload.value; 
    },
    setDefaultShedule: (state) => {
      state.shedule = state.startShedule;
    },
    setStartShedule: (state, action) => {
      state.startShedule = action.payload;
    }
  }
})

export const { setShedule, changeShedule, setDefaultShedule, setGroupId, setStartShedule } = sheduleSlice.actions;
export default sheduleSlice.reducer;