import { useAuthContext } from "../../context/AuthContext.jsx";
import { extractTime } from "../../utils/extractTime.js";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  console.log("message.senderId:", message.senderId);
  console.log("authUser._id:", authUser._id);
  console.log("fromMe:", fromMe);
  console.log("messages:", message);
  const formattedTime = extractTime(message.updatedAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-red-500" : "";
  const shakeMessage = message.shouldShake ? "animate-shake" : "";
 
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt={fromMe ? authUser.fullName : selectedConversation?.fullName}
          />
        </div>
      </div>

      <div
        className={`chat-bubble text-white ${shakeMessage} ${bubbleBgColor} pb-1`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-40 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
