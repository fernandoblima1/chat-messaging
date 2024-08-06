import { Avatar } from "../ui/avatar";
import { Info, Phone, Video } from "lucide-react";
import { cn, getFallbackColor } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { ModeToggle } from "../ui/mode-toggle";
import { AvatarFallback } from "@radix-ui/react-avatar";

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];
interface ChatTopbarProps {
  isHome: boolean;
  links: string[];
  isMobile: boolean;
}
export default function ChatTopbar({
  isHome,
  isMobile,
  links,
}: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex flex-row space-x-[-10px]">
        {isMobile &&
          links.map((link, index) => (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <a
                    className={
                      cn(buttonVariants({ variant: "ghost", size: "icon" })) +
                      "h-9 w-9 rounded-full "
                    }
                  >
                    <Avatar className="dark:text-slate-900 font-extrabold shadow-lg ">
                      <AvatarFallback
                        className={cn(
                          getFallbackColor(link),
                          "dark:text-slate-900 font-extrabold w-full h-full flex justify-center items-center "
                        )}
                      >
                        {link.at(0)}
                      </AvatarFallback>
                    </Avatar>
                  </a>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          ))}
      </div>

      <div className="flex flex-row gap-2">
        <ModeToggle />
        {!isHome &&
          TopbarIcons.map((icon, index) => (
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
