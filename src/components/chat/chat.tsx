import { Message, User } from "@/app/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";

interface ChatProps {
  userLogged: User;
  messages?: Message[];
  links: string[];
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function Chat({
  isMobile,
  userLogged,
  messages,
  links,
  sendMessage,
}: ChatProps) {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar isHome={false} isMobile={isMobile} links={links} />

      <ChatList
        userLogged={userLogged}
        messages={messages}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
