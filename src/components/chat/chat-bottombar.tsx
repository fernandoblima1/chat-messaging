import { SendHorizontal } from "lucide-react";
import React, { useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Message, User } from "@/app/data";
import { Textarea } from "../ui/textarea";
import { EmojiPicker } from "./emoji-picker";
import { format } from "date-fns-tz";

// Defina seu fuso horário
const timeZone = "America/Bahia";

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  userLogged: User;
}

export default function ChatBottombar({
  sendMessage,
  isMobile,
  userLogged,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = (event?: React.MouseEvent | React.KeyboardEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (message.trim()) {
      const timestamp = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
        timeZone,
      });

      const newMessage: Message = {
        id: Date.now(), // Use timestamp as ID
        user: userLogged,
        content: message.trim(),
        timestamp: timestamp, // Use the formatted timestamp
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSend(event);
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <div className="w-full relative">
        <Textarea
          autoComplete="off"
          value={message}
          ref={inputRef}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          name="message"
          placeholder="Aa"
          className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
        />
        <div className="absolute right-2 bottom-0.5">
          <EmojiPicker
            onChange={(value) => {
              setMessage((prev) => prev + value);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        </div>
      </div>

      <button
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-9 w-9",
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
        )}
        onClick={handleSend}
      >
        <SendHorizontal size={20} className="text-muted-foreground" />
      </button>
    </div>
  );
}
