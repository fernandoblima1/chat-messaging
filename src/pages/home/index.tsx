import ChatTopbar from "@/components/chat/chat-topbar";
import "./index.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/app/data";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const validateUsername = (name: string) => {
    const regex = /^[a-zA-Z0-9_]*$/;
    if (!regex.test(name)) {
      setError("Username só pode possuir letras, números e underline.");
      return false;
    }
    setError("");
    return true;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleEnterChat();
    }
  };

  const handleEnterChat = () => {
    if (!validateUsername(username)) {
      toast({
        title: "Ops! 😅",
        description: error,
      });
      return;
    }
    const user: User = {
      id: Date.now(),
      name: username,
      avatar: "/default-avatar.png",
    };

    navigate("/chat", { state: { user } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    if (validateUsername(value)) {
      setUsername(value);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <ChatTopbar isHome={true} />

      <Card className="flex flex-col gap-4 pt-8 w-96 my-10 rounded-3xl shadow-lg dark:border-none dark:shadow-2xl dark:shadow-black">
        <CardTitle className="text-left px-6 flex flex-row gap-4 items-center">
          <span>Entrar no Chat</span>
          <img
            src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif"
            width="30"
          />
        </CardTitle>
        <CardContent>
          <div className="flex flex-col justify-center items-center h-full gap-4">
            <Input
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Digite seu username"
              className="border p-2 rounded-md"
              onChange={handleChange}
              value={username.toUpperCase()}
            />
            <Button
              onClick={handleEnterChat}
              size={"default"}
              className="bg-blue-700 text-white font-extrabold hover:bg-blue-900"
            >
              Entrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
