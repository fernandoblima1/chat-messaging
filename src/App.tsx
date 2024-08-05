import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { RouterManager } from "./routes/RouteManager";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterManager />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
