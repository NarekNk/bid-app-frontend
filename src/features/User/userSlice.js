import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  uuid: "",
  firstName: "",
  lastName: "",
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setUuid(state, action) {
      state.uuid = action.payload;
    },
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
  },
});

export const { setUsername, setUuid, setFirstName, setLastName } =
  userSlice.actions;

export default userSlice.reducer;
