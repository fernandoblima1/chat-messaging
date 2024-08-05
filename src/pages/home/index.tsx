import ChatTopbar from "@/components/chat/chat-topbar";
import "./index.css";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const socket = new SockJS("http://localhost:8080/ws");
const stompClient = Stomp.over(socket);

export default function Home() {
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
            />
            <Button
              onClick={() => {
                stompClient.connect({}, () => {
                  console.log("Conectado");
                });
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
