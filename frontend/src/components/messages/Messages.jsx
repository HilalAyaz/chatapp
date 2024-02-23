import Message from "./Message";
import useGetMessages from "./../../hooks/useGetMessages";
import { useEffect, useRef } from "react";
import MessageSkeleton from "./../skeletons/MessageSkeleton";
import { IoMdChatbubbles } from "react-icons/io";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="px-4 flex-1 overflow-auto" id="message-container">
      {loading ? (
        Array.from({ length: 3 }, (_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-gray-400 mb-4">
            {" "}
            Send a message to start a conversation.
          </p>
          <IoMdChatbubbles size={36} color="gray" />
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}
      <div
        style={{ float: "left", clear: "both" }}
        ref={(el) => {
          el && el.scrollIntoView({ behavior: "smooth" });
        }}
      ></div>
    </div>
  );
};

export default Messages;
