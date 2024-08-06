import { cn, getFallbackColor } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  isCollapsed: boolean;
  links: string[];
  onClick?: () => void;
}

export function Sidebar({ links, isCollapsed }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "relative group flex flex-col h-full gap-4 p-2 transition-width duration-300",
        isCollapsed ? "none" : "w-64"
      )}
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Online</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>
        </div>
      )}
      <nav className="grid gap-4 my-4 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          !isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <a
                    href="#"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-14 w-full dark:bg-muted flex flex-row px-2 dark:text-muted-foreground rounded-full dark:hover:bg-muted dark:hover:text-white justify-start gap-2"
                    )}
                  >
                    <Avatar>
                      <AvatarFallback
                        className={cn(
                          getFallbackColor(link),
                          "dark:text-slate-900 font-extrabold"
                        )}
                      >
                        {link.at(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{link}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={20}
                  className="flex items-center gap-4 "
                >
                  {link}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <a
                    href="#"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" })
                    )}
                  >
                    <Avatar>
                      <AvatarFallback
                        className={cn(
                          getFallbackColor(link),
                          "dark:text-slate-900 font-extrabold"
                        )}
                      >
                        {link.at(0)}
                      </AvatarFallback>
                    </Avatar>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={20}
                  className="flex items-center gap-4 dark:bg-slate-800 dark:text-slate-100"
                >
                  {link}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        )}
      </nav>
    </div>
  );
}
