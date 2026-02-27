import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Analytics } from "@vercel/analytics/next"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LanguageProvider>
      <AuthProvider>
        <App />
        <Toaster position="top-right" richColors />
        <Analytics/>
      </AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);
