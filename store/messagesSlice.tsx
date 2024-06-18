// store/messagesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  user: string;
  avatar: string;
  time: string;
  timestamp: string;
  replies: Message[];
}

interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ message: Message; parentId?: string }>) => {
      const { message, parentId } = action.payload;
      if (!parentId) {
        state.messages.push(message);
      } else {
        const addReply = (messages: Message[]) => {
          for (const msg of messages) {
            if (msg.id === parentId) {
              msg.replies.push(message);
              return true;
            }
            if (addReply(msg.replies)) return true;
          }
          return false;
        };
        addReply(state.messages);
      }
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
