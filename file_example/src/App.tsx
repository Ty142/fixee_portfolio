import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { LandingPage } from "./components/LandingPage";

type Screen =
  | "landing"
  | "login"
  | "signup"
  | "forgot"
  | "otp"
  | "changePassword"
  | "success"
  | "main"
  | "serviceList";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (
      [
        "login",
        "signup",
        "forgot",
        "otp",
        "changePassword",
        "success",
      ].includes(currentScreen)
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [currentScreen]);

  const isAuthModalOpen = [
    "login",
    "signup",
    "forgot",
    "otp",
    "changePassword",
    "success",
  ].includes(currentScreen);
  const isMainApp = ["main", "serviceList"].includes(currentScreen);

  const closeAuthModal = () => setCurrentScreen("landing");

  return (
    <>
      {/* Landing Page is always visible unless we are in the main app */}
      {!isMainApp && (
        <LandingPage onLoginClick={() => setCurrentScreen("login")} />
      )}

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              if (e.target === e.currentTarget) closeAuthModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md my-8"
            >
              {/* Close Button */}
              <button
                onClick={closeAuthModal}
                className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {currentScreen === "login" && (
                <Login
                  isModal
                  onShowSignUp={() => setCurrentScreen("signup")}
                  onShowForgotPassword={() => setCurrentScreen("forgot")}
                  onLoginSuccess={closeAuthModal}
                />
              )}
              {currentScreen === "signup" && (
                <SignUp
                  isModal
                  onBackToLogin={() => setCurrentScreen("login")}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Screens */}
    </>
  );
}
