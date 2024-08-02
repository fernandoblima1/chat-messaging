import { loggedInUserData, messagesData, onlineUsersData } from "@/app/data";
import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { Chat } from "./chat";

export function ChatLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(loggedInUserData);
  const [onlineUsers, setOnlineUsers] = useState(onlineUsersData);
  const [messages, setMessages] = useState(messagesData);
  const [isMobile, setIsMobile] = useState(false);

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
      <Chat messages={messages} isMobile={isMobile} userLogged={userLoggedIn} />
    </>
  );
}
