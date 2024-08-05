import { Message, User } from "@/app/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface ChatProps {
  userLogged: User;
  messages?: Message[];
  isMobile: boolean;
}

export function Chat({ isMobile, userLogged }: ChatProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = Stomp.over(socket);
  const { toast } = useToast();

  useEffect(() => {
    stompClient.connect({}, onConnected, onError);
  }, []);

  function onConnected() {
    stompClient.subscribe("/topic/public", onMessageReceived);
    toast({
      title: "Isso aí! 🎉",
      variant: "default",
      description: "O socket foi conectado com sucesso",
    });
  }
  function onMessageReceived(payload: any) {
    // let newMessage = {

    // }
    // setMessages([...messages, JSON.parse(payload.body)]);
    console.log(payload.body);
  }
  function onError(error: any) {
    toast({
      title: "Oops... 😢",
      variant: "destructive",
      description: "Erro ao conectar ao chat",
      action: <ToastAction altText="Tentar de novo">Undo</ToastAction>,
    });
  }

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (newMessage: Message) => {
    stompClient.send("/app/chat.send", {}, JSON.stringify(newMessage));
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
