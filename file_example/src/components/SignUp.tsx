import { useState } from "react";
import svgPaths from "../imports/svg-86becjp7p7";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { handleApiError } from "@/utils/error.utils";
import { toast } from "sonner";

interface SignUpProps {
  onBackToLogin: () => void;
  isModal?: boolean;
}

export function SignUp({ onBackToLogin, isModal = false }: SignUpProps) {
  const { register, isLoading } = useAuth();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const imgImage3 =
    "https://res.cloudinary.com/djprssm3o/image/upload/v1771939590/3cead6480bba9c61b7b0ee38b081ba8a6b922219_a1enkv.png";

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validate all fields
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.fullName = "Họ và tên là bắt buộc";
    }

    if (!phone.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (!validatePhone(phone)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ (VD: 0123456789 hoặc +84123456789)";
    }

    if (!email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!agreed) {
      toast.error("Vui lòng đồng ý với điều khoản sử dụng");
      return;
    }

    try {
      // Call register from auth context
      await register({
        email: email.trim(),
        password,
        fullName: name.trim(),
        phoneNumber: phone.trim(),
      });

      // Show success notification
      setShowSuccess(true);
      
      // Navigate back to login after delay
      setTimeout(() => {
        onBackToLogin();
      }, 2500);
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
  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.fullName) {
      setErrors(prev => ({ ...prev, fullName: undefined }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (errors.phoneNumber) {
      setErrors(prev => ({ ...prev, phoneNumber: undefined }));
    }
  };

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

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
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
      {/* Success Notification */}
        {showSuccess && (
          <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 max-w-md w-full mx-4 animate-slideDown ${isModal ? "absolute" : "fixed"}`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">
                Đăng ký thành công!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Vui lòng đăng nhập để tiếp tục
              </p>
            </div>
          </div>
        )}

      {/* Main Container */}
      <div
        className={`w-full max-w-md mx-auto ${isModal ? 'animate-scaleIn' : 'animate-slideUp'}`}
      >
        {/* Logo Section */}
        <div
          className={
            isModal
              ? "flex justify-center mb-4 animate-fadeIn"
              : "flex justify-center mb-8 sm:mb-12 animate-fadeIn"
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
        </div>

        {/* Sign Up Card */}
        <div
          className={
            isModal
              ? "bg-white rounded-2xl shadow-2xl p-5 backdrop-blur-xl animate-fadeIn"
              : "bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl animate-slideUp"
          }
        >
          {/* Back Button & Header */}
          <div className={isModal ? "mb-4" : "mb-6 sm:mb-8"}>
            <button
              onClick={onBackToLogin}
              disabled={isLoading}
              className="flex items-center gap-2 text-[#fc5123] hover:text-[#e63946] transition-colors duration-200 mb-2 group disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-semibold text-sm">Quay lại</span>
            </button>
            <h1
              className={
                isModal
                  ? "font-extrabold text-xl text-gray-900 mb-1"
                  : "font-extrabold text-3xl text-gray-900 mb-2"
              }
            >
              Đăng ký tài khoản
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Tạo tài khoản mới để bắt đầu
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={isModal ? "space-y-3" : "space-y-5"}
          >
            {/* Name Field */}
            <div className="relative">
              <div
                className="transition-transform duration-200"
                style={{ transform: nameFocused ? 'scale(1.02)' : 'scale(1)' }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  placeholder="Họ và tên"
                  disabled={isLoading}
                  className={`w-full ${isModal ? "px-4 py-3 text-sm" : "px-4 sm:px-5 py-3 sm:py-4 sm:text-base"} rounded-xl border-2 transition-all duration-300 outline-none ${
                    errors.fullName
                      ? "border-red-500 bg-red-50/50"
                      : nameFocused
                      ? "border-[#fc5123] bg-orange-50/50 shadow-lg shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
              {nameFocused && !errors.fullName && (
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#fc5123] rounded-full animate-scaleIn"
                />
              )}
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative">
              <div
                className="transition-transform duration-200"
                style={{ transform: phoneFocused ? 'scale(1.02)' : 'scale(1)' }}
              >
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  placeholder="Số điện thoại"
                  disabled={isLoading}
                  className={`w-full ${isModal ? "px-4 py-3 text-sm" : "px-4 sm:px-5 py-3 sm:py-4 sm:text-base"} rounded-xl border-2 transition-all duration-300 outline-none ${
                    errors.phoneNumber
                      ? "border-red-500 bg-red-50/50"
                      : phoneFocused
                      ? "border-[#fc5123] bg-orange-50/50 shadow-lg shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
              {phoneFocused && !errors.phoneNumber && (
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#fc5123] rounded-full animate-scaleIn"
                />
              )}
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <div
                className="transition-transform duration-200"
                style={{ transform: emailFocused ? 'scale(1.02)' : 'scale(1)' }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="Địa chỉ Email"
                  disabled={isLoading}
                  className={`w-full ${isModal ? "px-4 py-3 text-sm" : "px-4 sm:px-5 py-3 sm:py-4 sm:text-base"} rounded-xl border-2 transition-all duration-300 outline-none ${
                    errors.email
                      ? "border-red-500 bg-red-50/50"
                      : emailFocused
                      ? "border-[#fc5123] bg-orange-50/50 shadow-lg shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
              {emailFocused && !errors.email && (
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#fc5123] rounded-full animate-scaleIn"
                />
              )}
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div
                className="transition-transform duration-200"
                style={{ transform: passwordFocused ? 'scale(1.02)' : 'scale(1)' }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="Mật khẩu"
                  disabled={isLoading}
                  className={`w-full ${isModal ? "px-4 py-3 text-sm" : "px-4 sm:px-5 py-3 sm:py-4 sm:text-base"} rounded-xl border-2 transition-all duration-300 outline-none pr-12 ${
                    errors.password
                      ? "border-red-500 bg-red-50/50"
                      : passwordFocused
                      ? "border-[#fc5123] bg-orange-50/50 shadow-lg shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
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
                      id="mask0_pass"
                      maskUnits="userSpaceOnUse"
                      style={{ maskType: "alpha" }}
                      width="16"
                      x="0"
                      y="1"
                    >
                      <path d={svgPaths.pe471e00} fill="currentColor" />
                    </mask>
                    <g mask="url(#mask0_pass)">
                      <rect fill="currentColor" height="16" width="16" />
                    </g>
                  </g>
                </svg>
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div
                className="transition-transform duration-200"
                style={{ transform: confirmPasswordFocused ? 'scale(1.02)' : 'scale(1)' }}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  placeholder="Xác nhận mật khẩu"
                  disabled={isLoading}
                  className={`w-full ${isModal ? "px-4 py-3 text-sm" : "px-4 sm:px-5 py-3 sm:py-4 sm:text-base"} rounded-xl border-2 transition-all duration-300 outline-none pr-12 ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-50/50"
                      : confirmPasswordFocused
                      ? "border-[#fc5123] bg-orange-50/50 shadow-lg shadow-orange-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#fc5123] transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 16 16">
                  <g>
                    <mask
                      height="14"
                      id="mask0_confirm"
                      maskUnits="userSpaceOnUse"
                      style={{ maskType: "alpha" }}
                      width="16"
                      x="0"
                      y="1"
                    >
                      <path d={svgPaths.p33ef7d80} fill="currentColor" />
                    </mask>
                    <g mask="url(#mask0_confirm)">
                      <rect fill="currentColor" height="16" width="16" />
                    </g>
                  </g>
                </svg>
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex gap-3 items-start">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                disabled={isLoading}
                className={`shrink-0 w-5 h-5 rounded-lg border-2 transition-all duration-300 flex items-center justify-center mt-0.5 ${
                  agreed
                    ? "bg-[#fc5123] border-[#fc5123]"
                    : "border-gray-300 hover:border-[#fc5123]"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {agreed && (
                  <svg
                    className="w-3 h-3 text-white animate-scaleIn"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tôi đã đọc và đồng ý với{" "}
                <button
                  type="button"
                  className="text-[#fc5123] font-semibold hover:underline"
                >
                  Điều khoản sử dụng
                </button>{" "}
                và{" "}
                <button
                  type="button"
                  className="text-[#fc5123] font-semibold hover:underline"
                >
                  Chính sách bảo mật
                </button>
              </p>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={!agreed || isLoading}
              className={`w-full font-semibold ${isModal ? "py-3 text-sm" : "py-3 sm:py-4 sm:text-base"} rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                agreed && !isLoading
                  ? "bg-gradient-to-r from-[#fc5123] to-[#ff6b4a] text-white shadow-orange-300/50 hover:shadow-xl hover:shadow-orange-400/50 animate-hover-scale"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang đăng ký...</span>
                </>
              ) : (
                "Tạo tài khoản"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-xs sm:text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={onBackToLogin}
                disabled={isLoading}
                className="text-[#fc5123] font-semibold hover:text-[#e63946] transition-colors duration-200 hover:underline disabled:opacity-50"
              >
                Đăng nhập
              </button>
            </p>
          </form>
        </div>

        {/* Footer */}
        {!isModal && (
          <p
            className="text-center text-white/80 text-sm mt-6 animate-fadeIn"
          >
            Bằng việc đăng ký, bạn đồng ý với Điều khoản & Chính sách bảo mật
          </p>
        )}
      </div>
    </div>
  );
}
