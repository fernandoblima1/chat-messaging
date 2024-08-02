import { Message, User } from "@/app/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";

interface ChatProps {
  userLogged: User;
  messages?: Message[];
  isMobile: boolean;
}

export function Chat({ messages, isMobile, userLogged }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar />

      <ChatList
        userLogged={userLogged}
        messages={messagesState}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
