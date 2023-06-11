import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  userStatus: null,
}
const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserStatus: (state, action) => {
      state.userStatus = action.payload;
    },
    logOut: (state, action) => {
      state.userStatus = null;
      state.isAuth = false;
    }
  }
})

export const {setAuth, setUserStatus, logOut } = userSlice.actions;
export default userSlice.reducer;