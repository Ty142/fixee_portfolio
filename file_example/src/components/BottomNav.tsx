import svgPaths from "../imports/svg-1dd220s04v";

interface BottomNavProps {
  activeTab?: "home" | "activity" | "messages" | "profile";
  onTabChange?: (tab: "home" | "activity" | "messages" | "profile") => void;
}

export function BottomNav({ activeTab = "home", onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-1 sm:pb-2 px-4 z-50">
      <div className="bg-white flex items-center justify-between px-4 sm:px-6 py-1.5 rounded-full shadow-[0px_0px_16.8px_0px_rgba(84,84,86,0.34)] h-14 sm:h-16 w-full max-w-md">
        {/* Home Tab */}
        <button
          onClick={() => onTabChange?.("home")}
          className={`${activeTab === "home" ? "bg-[#fc5123] px-3" : "w-10 sm:w-12 justify-center hover:opacity-70"} flex items-center gap-1.5 py-1.5 rounded-full transition-all duration-300`}
        >
          <div className={`${activeTab === "home" ? "w-4 h-7" : "w-5 h-7"}`}>
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 17.3333 28.9583"
            >
              <path
                d={svgPaths.p22525e80}
                fill={activeTab === "home" ? "white" : "#D4D6DD"}
              />
            </svg>
          </div>
          {activeTab === "home" && (
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-white leading-tight tracking-wide whitespace-nowrap">
              Trang chủ
            </p>
          )}
        </button>

        {/* Calendar/History Tab */}
        <button
          onClick={() => onTabChange?.("activity")}
          className={`${activeTab === "activity" ? "bg-[#fc5123] px-3" : "w-10 sm:w-12 justify-center hover:opacity-70"} flex items-center gap-1.5 py-1.5 rounded-full transition-all duration-300`}
        >
          <div
            className={`${activeTab === "activity" ? "w-4 h-6" : "w-5 h-7"}`}
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 21.0833 28.254"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p2d738e80}
                fill={activeTab === "activity" ? "white" : "#D4D6DD"}
                fillRule="evenodd"
              />
            </svg>
          </div>
          {activeTab === "activity" && (
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-white leading-tight tracking-wide whitespace-nowrap">
              Lịch đặt
            </p>
          )}
        </button>

        {/* Messages Tab */}
        <button
          onClick={() => onTabChange?.("messages")}
          className={`${activeTab === "messages" ? "bg-[#fc5123] px-3" : "w-10 sm:w-12 justify-center hover:opacity-70"} flex items-center gap-1.5 py-1.5 rounded-full transition-all duration-300`}
        >
          <div
            className={`${activeTab === "messages" ? "w-4 h-6" : "w-4 h-7"}`}
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 20 27.1429"
            >
              <path
                d={svgPaths.p2f788820}
                fill={activeTab === "messages" ? "white" : "#D4D6DD"}
                stroke={activeTab === "messages" ? "white" : "#D4D6DD"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          {activeTab === "messages" && (
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-white leading-tight tracking-wide whitespace-nowrap">
              Tin nhắn
            </p>
          )}
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => onTabChange?.("profile")}
          className={`${activeTab === "profile" ? "bg-[#fc5123] px-3" : "w-10 sm:w-12 justify-center hover:opacity-70"} flex items-center gap-1.5 py-1.5 rounded-full transition-all duration-300`}
        >
          <div className={`${activeTab === "profile" ? "w-4 h-6" : "w-5 h-7"}`}>
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 20 29.0476"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p2b2df000}
                fill={activeTab === "profile" ? "white" : "#D4D6DD"}
                fillRule="evenodd"
              />
            </svg>
          </div>
          {activeTab === "profile" && (
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-white leading-tight tracking-wide whitespace-nowrap">
              Cá nhân
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
