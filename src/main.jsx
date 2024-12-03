import "./index.css";

import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/system";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <main className="dark text-foreground bg-background">
      <App />
    </main>
  </NextUIProvider>
);
