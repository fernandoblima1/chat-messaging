import { User } from "@/app/data";
import { ChatLayout } from "@/components/chat/chat-layout";
import { useLocation } from "react-router-dom";
export default function ChatPage() {
  const location = useLocation();
  const user = location.state?.user as User;
  return (
    <main className="flex flex-col gap-4  h-[calc(100dvh)]">
      <div className="z-10 border rounded-lg w-full h-full text-sm flex">
        <ChatLayout userLogged={user} />
      </div>

      <div className="flex justify-between w-full items-start text-xs md:text-sm text-muted-foreground ">
        <p className="max-w-[150px] sm:max-w-lg">
          Feito por{" "}
          <a className="font-semibold" href="https://github.com/fernandoblima1">
            Luis Fernando
          </a>
          . Criado com{" "}
          <a className="font-semibold" href="https://ui.shadcn.com/">
            shadcn
          </a>
          .
        </p>
        <p className="max-w-[150px] sm:max-w-lg text-right">
          Código fonte disponível no{" "}
          <a
            className="font-semibold"
            href="https://github.com/fernandoblima1/chat-messaging"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
