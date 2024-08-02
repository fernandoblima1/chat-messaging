import { Message, User } from "@/app/data";
import { cn, getFallbackColor } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

const timeZone = "America/Bahia";

interface ChatListProps {
  userLogged: User;
  messages?: Message[];
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  userLogged,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Ordena as mensagens por timestamp
  const sortedMessages = messages?.slice().sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {sortedMessages?.map((message, index) => {
            // Converte o timestamp para o fuso horário desejado
            const zonedDate = toZonedTime(
              new Date(message.timestamp),
              timeZone
            );
            const timeAgo = formatDistanceToNow(zonedDate, {
              addSuffix: true,
              locale: ptBR,
            });

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: "spring",
                    bounce: 0.3,
                    duration: sortedMessages.indexOf(message) * 0.05 + 0.2,
                  },
                }}
                className={cn(
                  "flex flex-col gap-2 p-4 whitespace-pre-wrap relative",
                  message.user.id === userLogged.id
                    ? "items-end"
                    : "items-start"
                )}
              >
                <div className="flex gap-3 items-center">
                  {message.user.id !== userLogged.id && (
                    <Avatar className="flex justify-start items-center">
                      <AvatarFallback
                        className={cn(
                          getFallbackColor(message.user.id),
                          "dark:text-slate-900 font-extrabold"
                        )}
                      >
                        {message.user.name.at(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="bg-accent p-3 rounded-md max-w-xs relative flex flex-col align-top">
                    <span className="text-justify">{message.content}</span>
                    <span className="text-xs text-gray-500 mt-1 self-end">
                      {timeAgo}
                    </span>
                  </div>
                  {message.user.id === userLogged.id && (
                    <Avatar className="flex justify-start items-center">
                      <AvatarFallback
                        className={cn(
                          getFallbackColor(userLogged.id),
                          "dark:text-slate-900 font-extrabold"
                        )}
                      >
                        {message.user.name.at(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
