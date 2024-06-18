"use client";

// components/BodyComponent
import { Provider } from "react-redux";
import { store } from "../store/store";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import ImageBody from "./ImageBody";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="xl:max-w-4xl lg:max-w-3xl md:max-w-xl mx-auto p-4 flex justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Chat Application</h1>
        <div className=" p-2">
          <ImageBody />
          <MessageList />
          <MessageInput />
        </div>
      </div>
    </Provider>
  );
}
