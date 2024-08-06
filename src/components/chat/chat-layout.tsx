import { Message, User } from "@/app/data";
import { useEffect, useRef, useState } from "react";
import { Chat } from "./chat";
import { ToastAction } from "@radix-ui/react-toast";
import SockJS from "sockjs-client";
import { useToast } from "../ui/use-toast";
import Stomp from "stompjs";
import { Sidebar } from "./sidebar";
import { useNavigate } from "react-router-dom";

interface ChatLayoutProps {
  userLogged: User;
}

export function ChatLayout({ userLogged }: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = Stomp.over(socket);
  const { toast } = useToast();

  const nav = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      nav("/");
      return;
    }
  }, [userLogged, nav]);

  useEffect(() => {
    stompClient.connect({}, onConnected, onError);
  }, []);

  function onConnected() {
    stompClient.subscribe("/topic/public", onMessageReceived);
    // toast({
    //   title: "Isso aí! 🎉",
    //   variant: "default",
    //   description: "O socket foi conectado com sucesso",
    // });
    const registerMessage = {
      type: "JOIN",
      sender: userLogged.name,
      content: "",
      timestamp: new Date().toISOString(),
    };
    stompClient.send("/app/chat.register", {}, JSON.stringify(registerMessage));
    stompClient.send("/app/chat.users", {});
  }

  function onMessageReceived(payload: any) {
    try {
      const body = JSON.parse(payload.body);

      if (body.type === "JOIN") {
        const newUser = body.sender;
        setOnlineUsers((prevUsers) => [...prevUsers, newUser]);
      }

      if (body.type === "LEAVE") {
        const leavingUser = JSON.parse(body.sender);
        setOnlineUsers((prevUsers) =>
          prevUsers.filter((user) => user !== leavingUser)
        );
      }

      if (body.type === "USERS_LIST") {
        const usersList = body.users as string[];
        setOnlineUsers(usersList);
      }

      if (body.content) {
        const messageContent = JSON.parse(body.content) as Message;
        const newMessageFormatted = {
          id: messageContent.id,
          content: messageContent.content,
          user: JSON.parse(body.sender) as User,
          timestamp: messageContent.timestamp,
        };
        setMessages((prevMessages) => [...prevMessages, newMessageFormatted]);
      }
    } catch (error) {
      console.error("Failed to parse message:", error);
    }
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
    const messageFormated = {
      type: "CHAT",
      content: JSON.stringify(newMessage),
      sender: JSON.stringify(newMessage.user),
      timestamp: newMessage.timestamp,
    };
    stompClient.send("/app/chat.send", {}, JSON.stringify(messageFormated));
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleCollapse = () => {
    setIsCollapsed(window.innerWidth > 768 && window.innerWidth <= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleCollapse);
    handleResize();
    handleCollapse();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleCollapse);
    };
  }, []);

  return (
    <>
      {!isMobile && <Sidebar isCollapsed={isCollapsed} links={onlineUsers} />}
      <Chat
        links={onlineUsers}
        isMobile={isMobile}
        userLogged={userLogged}
        sendMessage={sendMessage}
        messages={messages}
      />
    </>
  );
}
