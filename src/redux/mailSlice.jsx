import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    inbox: [],
    selectedMail: null,
  },
  reducers: {
    setInbox(state, action) {
      state.inbox = action.payload;
    },
    setSelectedMail(state, action) {
      state.selectedMail = action.payload;
    },
  },
});

export const { setInbox, setSelectedMail } = mailSlice.actions;
export default mailSlice.reducer;
