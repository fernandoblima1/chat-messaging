import { ChatLayout } from "@/components/chat/chat-layout";

export default function Home() {
  return (
    <main className="flex flex-col gap-4  h-[calc(100dvh)]">
      {/* <div className="flex justify-between max-w-5xl w-full items-center">
        <a
          href="https://github.com/fernandoblima1/chat-messaging"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-10 w-10"
          )}
        >
          <GitHubLogoIcon className="w-7 h-7 text-muted-foreground" />
        </a>
      </div> */}

      <div className="z-10 border rounded-lg w-full h-full text-sm flex">
        <ChatLayout />
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
