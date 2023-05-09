import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MessagePayload } from "./@types";

type MessageState = {
  message: MessagePayload | null;
};

const initialState: MessageState = {
  message: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<MessagePayload | null>) {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;
export const messageName = messageSlice.name;

export const MessageSelectors = {
  getMessage: (state: RootState) => state.message.message,
};
