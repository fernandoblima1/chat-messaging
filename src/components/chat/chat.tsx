import { Message, User } from "@/app/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

interface ChatProps {
  userLogged: User;
  messages?: Message[];
  isMobile: boolean;
}
const socket = new SockJS("http://localhost:8080/ws");
const stompClient = Stomp.over(socket);

export function Chat({ isMobile, userLogged }: ChatProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);

      stompClient.subscribe("/topic/public", (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    // return () => {
    //   stompClient.disconnect(() => {
    //     console.log("Disconnected");
    //   });
    // };
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (newMessage: Message) => {
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(newMessage));
  };

  // const sendMessage = (newMessage: Message) => {
  //   setMessages([...messagesState, newMessage]);
  // };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar isHome={false} />

      <ChatList
        userLogged={userLogged}
        messages={messages}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
