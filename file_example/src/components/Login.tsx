import { useState } from "react";
import svgPaths from "../imports/svg-2bxzb4qdc1";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { handleApiError } from "@/utils/error.utils";
import { toast } from "sonner";

interface LoginProps {
  onShowSignUp: () => void;
  onShowForgotPassword: () => void;
  onLoginSuccess: () => void;
  isModal?: boolean;
}

export function Login({
  onShowSignUp,
  onLoginSuccess,
  isModal = false,
}: LoginProps) {
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const imgImage3 =
    "https://res.cloudinary.com/djprssm3o/image/upload/v1771939590/3cead6480bba9c61b7b0ee38b081ba8a6b922219_a1enkv.png";

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validate email format
    if (!email) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      return;
    }

    // Validate password
    if (!password) {
      setErrors(prev => ({ ...prev, password: "Password is required" }));
      return;
    }

    try {
      // Call login from auth context
      await login(email, password);
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Close modal and stay on landing page after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      // Error handling
      const errorResult = handleApiError(error);
      
      // Display field-specific errors if available
      if (errorResult.fieldErrors) {
        setErrors(errorResult.fieldErrors);
      } else {
        // Display general error message
        toast.error(errorResult.message);
      }
    }
  };

  // Clear error when user starts typing
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  return (
    <div
      className={
        isModal
          ? "w-full overflow-hidden"
          : "min-h-screen bg-gradient-to-br from-[#ff6b4a] via-[#fc5123] to-[#e63946] flex items-center justify-center p-4 sm:p-6"
      }
    >
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -100 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 ${isModal ? "absolute" : "fixed"}`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3">
                  Thư Ngõ!
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Cảm ơn quý khách đã quan tâm đến <span className="font-semibold text-[#fc5123]">Fixee</span>, hiện Fixee đang trong quá trình hoàn thiện app. 
                  Bạn sẽ là khách hàng sớm nhất được trải nghiệm khi Fixee ra mắt. 
                  Đội ngũ Fixee xin chân thành cảm ơn! 🙏
                </p>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-[#fc5123] to-[#ff6b4a]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <motion.div
        initial={isModal ? { opacity: 0, scale: 0.95 } : { opacity: 0, y: 20 }}
        animate={isModal ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={
            isModal
              ? "flex justify-center mb-4"
              : "flex justify-center mb-8 sm:mb-12"
          }
        >
          <div className="relative">
            <div
              className={
                isModal
                  ? "bg-white rounded-2xl p-3 shadow-xl"
                  : "bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl"
              }
            >
              <img
                src={imgImage3}
                alt="Fixee Logo"
                className={
                  isModal
                    ? "w-16 h-16 object-contain"
                    : "w-24 h-24 sm:w-28 sm:h-28 object-contain"
                }
              />
            </div>
            <div className="absolute inset-0 bg-white/20 rounded-2xl sm:rounded-3xl blur-2xl -z-10 scale-110" />
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={
            isModal
              ? "bg-white rounded-2xl shadow-2xl p-5 backdrop-blur-xl"
              : "bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl"
          }
        >
          {/* Welcome Text */}
          <div className={isModal ? "mb-4 text-center" : "mb-6 sm:mb-8"}>
            <h1
              className={
                isModal
                  ? "font-extrabold text-xl text-gray-900 mb-1"
                  : "font-extrabold text-2xl sm:text-3xl text-gray-900 mb-2"
              }
            >
              Fixee xin chào! 👋
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Đăng nhập để tiếp tục trải nghiệm
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={isModal ? "space-y-3" : "space-y-5"}
          >
            {/* Email Field */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: emailFocused ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="Địa chỉ Email"
                  disabled={isLoading}
                  className={`w-full ${isModal ? "px-4 py-3 text-sm" : "px-5 py-4"} rounded-xl border-2 transition-all duration-300 outline-none ${
                    errors.email
                      ? "border-red-500 bg-red-50/50"
                      : emailFocused
                      ? "border-[#fc5123] bg-orange-50/50 shadow-lg shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </motion.div>
              {emailFocused && !errors.email && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#fc5123] rounded-full"
                />
              )}
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: passwordFocused ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="Mật khẩu"
                  disabled={isLoading}
                  className={`w-full ${isModal ? "px-4 py-3 text-sm" : "px-5 py-4"} rounded-xl border-2 transition-all duration-300 outline-none pr-12 ${
                    errors.password
                      ? "border-red-500 bg-red-50/50"
                      : passwordFocused
                      ? "border-[#fc5123] bg-orange-50/50 shadow-lg shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </motion.div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#fc5123] transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 16 16">
                  <g>
                    <mask
                      height="14"
                      id="mask0_1_367"
                      maskUnits="userSpaceOnUse"
                      style={{ maskType: "alpha" }}
                      width="16"
                      x="0"
                      y="1"
                    >
                      <path d={svgPaths.p33ef7d80} fill="currentColor" />
                    </mask>
                    <g mask="url(#mask0_1_367)">
                      <rect fill="currentColor" height="16" width="16" />
                    </g>
                  </g>
                </svg>
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-[#fc5123] to-[#ff6b4a] text-white font-semibold ${isModal ? "py-3 text-sm" : "py-3 sm:py-4 sm:text-base"} rounded-xl shadow-lg shadow-orange-300/50 hover:shadow-xl hover:shadow-orange-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                "Đăng nhập"
              )}
            </motion.button>

            {/* Register Link */}
            <p className="text-center text-xs sm:text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                onClick={onShowSignUp}
                className="text-[#fc5123] font-semibold hover:text-[#e63946] transition-colors duration-200 hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
          </form>

          {/* Divider */}
        </motion.div>

        {/* Footer */}
        {!isModal && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-white/80 text-sm mt-6"
          >
            Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
