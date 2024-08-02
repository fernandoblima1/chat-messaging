import { Avatar } from "../ui/avatar";
import { Info, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { ModeToggle } from "../ui/mode-toggle";

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar() {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center"></Avatar>
        <div className="flex flex-col">
          <span className="text-xs">Sala - W45SDAS</span>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <ModeToggle />
        {TopbarIcons.map((icon, index) => (
          <TooltipProvider key={index}>
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <a
                  key={index}
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9 rounded-full",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <icon.icon size={20} className="text-muted-foreground" />
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="flex items-center gap-4 text-slate-500 text-xs"
              >
                {"Disponível em breve"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
