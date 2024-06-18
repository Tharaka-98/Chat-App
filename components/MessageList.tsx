// component/MessageList.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { formatDistance, subDays } from "date-fns";
import { FaReply } from "react-icons/fa";
import MessageInput from "./MessageInput";

const MessageList: React.FC = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const [replyingTo, setReplyingTo] = useState<{ [key: string]: boolean }>({});

  const handleReplyClick = (id: string) => {
    setReplyingTo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSend = (id: string) => {
    setReplyingTo((prev) => ({ ...prev, [id]: false }));
  };

  const countReplies = (message: any) => {
    let count = message.replies.length;
    message.replies.forEach((reply: any) => {
      count += countReplies(reply);
    });
    return count;
  };

  const renderMessage = (message: any, isReply = false) => (
    <div
      key={message.id}
      className={`flex flex-col ${isReply ? "pl-8" : ""}  gap-2 py-4 `}
    >
      <div className="flex flex-row gap-6 bg-white rounded-lg px-4 py-4">
        <div className="flex gap-4 justify-around bg-gray-100 px-2 font-semibold rounded-md items-start flex-col">
          <div className="text-gray-400">+</div>
          <div className="text-blue-700">{countReplies(message)}</div>
          <div className="text-gray-400">-</div>
        </div>
        <div className="flex gap-4 w-full items-start flex-wrap sm:flex-nowrap">
          <img
            src={message.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="w-full">
            <div className="flex justify-between ">
              <div className="flex gap-4">
                <div className="font-bold text-black capitalize text-[12px] md:text-[16px]">
                  {message.user}
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-4">
                <div className="text-sm text-gray-500">
                  {formatDistance(subDays(new Date(), 1), new Date(), {
                    addSuffix: true,
                  })}
                </div>
                <button
                  onClick={() => handleReplyClick(message.id)}
                  className="text-blue-700 text-[12px] md:text-[16px] font-semibold flex items-center gap-1"
                >
                  <FaReply />
                  Reply
                </button>
              </div>
            </div>
            <div className="mt-2 text-[12px] md:text-[16px]">
              {message.text}
            </div>
          </div>
        </div>
      </div>

      {replyingTo[message.id] && (
        <MessageInput
          parentId={message.id}
          onSend={() => handleSend(message.id)}
        />
      )}

      {message.replies && message.replies.length > 0 && (
        <div className="flex flex-col gap-2 pl-8">
          {message.replies.map((reply: any) => renderMessage(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {messages.map((message) => renderMessage(message))}
    </div>
  );
};

export default MessageList;
