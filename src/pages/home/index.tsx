import ChatTopbar from "@/components/chat/chat-topbar";
import "./index.css";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = Stomp.over(socket);
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    stompClient.connect({}, onConnected, onError);
  }, []);

  function onConnected() {
    toast({
      title: "Isso aí! 🎉",
      variant: "default",
      description: "O socket foi conectado com sucesso",
    });
  }

  function onError(error: any) {
    toast({
      title: "Oops... 😢",
      variant: "destructive",
      description: "Erro ao conectar ao chat",
      action: <ToastAction altText="Tentar de novo">Undo</ToastAction>,
    });
  }

  return (
    <div className="flex flex-col  items-center w-full h-full">
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
              type="text"
              placeholder="Digite seu username"
              className="border p-2 rounded-md"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              onClick={() => {
                stompClient.send(
                  "/app/chat.register",
                  {},
                  JSON.stringify({ sender: username, type: "JOIN" })
                );
                navigate("/chat");
              }}
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
