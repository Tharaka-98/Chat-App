// component/MessageInput.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/messagesSlice";
import { fetchUserData } from "../utils/fetchUserData"; // Import the utility function

interface FormData {
  comment: string;
}

interface MessageInputProps {
  parentId?: string;
  onSend?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ parentId, onSend }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({ username: "", avatar: "" });

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    getUserData();
  }, []);

  const onSubmit = (data: FormData) => {
    const newMessage = {
      id: Date.now().toString(),
      user: userData.username,
      time: new Date().toLocaleString(),
      timestamp: new Date().toISOString(),
      text: data.comment,
      avatar: userData.avatar,
      replies: [],
    };

    dispatch(addMessage({ message: newMessage, parentId }));
    reset();
    if (onSend) onSend();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white shadow-md rounded-lg mb-4 mt-4 flex gap-2"
    >
      <div className="mb-4 flex w-full gap-2">
        <img
          src={userData.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col w-full">
          <textarea
            {...register("comment", { required: true })}
            placeholder="Add a comment..."
            rows={5}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          ></textarea>
          {errors.comment && (
            <span className="text-red-500">Comment is required</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#692db4] h-[34px] text-white font-medium py-2 px-5 text-[12px] rounded-md"
      >
        SEND
      </button>
    </form>
  );
};

export default MessageInput;
