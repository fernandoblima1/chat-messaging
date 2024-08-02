import { ComponentType } from "react";
import Home from "../pages/home";
import Chat from "../pages/chat";

export const Routes: Record<string, ComponentType> = {
  "/chat": Chat,
  "/": Home,
};
