import { useState } from "react";
import { AlertCircle, MapPin, Wrench, Wallet, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface LandingPageProps {
  onLoginClick: () => void;
}
const imgRectangle5 =
  "https://res.cloudinary.com/djprssm3o/image/upload/v1771939591/7ac3f881024e6f731886c7ef7169ccfaa9e6bca9_urdr2w.png";
const imgRectangle4 =
  "https://res.cloudinary.com/djprssm3o/image/upload/v1771939592/24a6df05dd54d04485d30c204fa4f667a18907e8_nmblfg.png";
const imgRectangle6 =
  "https://res.cloudinary.com/djprssm3o/image/upload/v1771939592/aabd6cb6019437539ef30a55ac62db7a572916a7_yureeb.png";
const imgRectangle7 =
  "https://res.cloudinary.com/djprssm3o/image/upload/v1771939592/24a6df05dd54d04485d30c204fa4f667a18907e8_nmblfg.png";
const imgRectangle8 =
  "https://res.cloudinary.com/djprssm3o/image/upload/v1771939591/34c029c71c27ea674ea312e207bf99c02682b74e_isnhwx.png";
const imgRectangle9 =
  "https://res.cloudinary.com/djprssm3o/image/upload/v1771939600/6598f0c157de045e18f013b74188be6944644856_lglpij.png";

function PhoneDemo() {
  const { t } = useLanguage();
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
        {/* Screen Content */}
        {!showMap ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center bg-[#f5f5f5] p-6 text-center animate-fadeIn"
          >
            <div className="w-20 h-20 bg-[#fc5123] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/30">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1f2024] mb-2">
              {t.demo.needMechanic}
            </h3>
            <p className="text-gray-500 text-sm mb-8">
              {t.demo.findNearby}
            </p>

            <button
              onClick={() => setShowMap(true)}
              className="w-full bg-[#fc5123] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/20 animate-hover-scale"
            >
              {t.demo.findNearby}
            </button>
          </div>
        ) : (
          <div
            className="w-full h-full relative animate-fadeIn"
          >
            <img
              src="https://images.unsplash.com/photo-1620662892011-f5c2d523fae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              className="w-full h-full object-cover"
              alt="Map"
            />

            {/* Overlay UI */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-12 bg-gradient-to-b from-black/50 to-transparent">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg w-max mx-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">
                  {t.demo.findingMechanic}
                </span>
              </div>
            </div>

            {/* Pins */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-scaleIn"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-32 h-32 bg-[#fc5123]/10 rounded-full animate-ping absolute"></div>
                <div className="w-8 h-8 bg-[#fc5123] rounded-full border-4 border-white shadow-xl relative z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Mechanic Popups */}
            <div
              className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 z-20 animate-slideUp"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden shrink-0">
                <img
                  src="https://i.pravatar.cc/100?img=33"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-[#1f2024] truncate">
                  Nguyễn Văn A
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">500m</span>
                  <span className="text-xs text-[#fc5123] font-medium flex items-center">
                    <span className="mr-0.5">★</span>4.9
                  </span>
                </div>
              </div>
              <button className="bg-[#fc5123] text-white text-xs px-3 py-1.5 rounded-lg font-medium shrink-0">
                Gọi
              </button>
            </div>

            <button
              onClick={() => setShowMap(false)}
              className="absolute top-12 left-4 bg-white/80 p-2 rounded-full shadow-md z-20"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-black/20 rounded-full z-20"></div>
      </div>
    </div>
  );
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  const { t } = useLanguage();
  
  const services = [
    {
      name: t.services.tireRepair,
      img: imgRectangle4,
      desc: t.services.tireRepairDesc,
    },
    {
      name: t.services.engineDead,
      img: imgRectangle5,
      desc: t.services.engineDeadDesc,
    },
    { 
      name: t.services.outOfGas, 
      img: imgRectangle6, 
      desc: t.services.outOfGasDesc 
    },
    {
      name: t.services.batteryReplacement,
      img: imgRectangle7,
      desc: t.services.batteryReplacementDesc,
    },
    {
      name: t.services.towing,
      img: imgRectangle8,
      desc: t.services.towingDesc,
    },
    {
      name: t.services.inspection,
      img: imgRectangle9,
      desc: t.services.inspectionDesc,
    },
  ];
  
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div
              className="w-14 h-14 2 rounded-lg flex items-center justify-center text-white font-bold"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                className="w-full h-full object-contain rounded-lg shadow-lg shadow-orange-500/30 "
                src="https://res.cloudinary.com/djprssm3o/image/upload/v1771942060/Login_p1rc6t.png"
                alt="Fixee Logo"
              ></img>
            </div>
          </div>
          <div className="flex justify-left  gap-4 items-center h-16">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 -ml-2 text-gray-600 hover:text-[#fc5123] rounded-lg hover:bg-orange-50 transition-colors focus:outline-none">
                    <Menu className="w-6 h-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 bg-white p-1 shadow-xl border-gray-100 rounded-xl mt-2"
                >
                  <DropdownMenuItem asChild>
                    <a
                      href="#features"
                      className="w-full cursor-pointer flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#fc5123] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      {t.nav.services}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="#demo"
                      className="w-full cursor-pointer flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#fc5123] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      {t.nav.experience}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="#how-it-works"
                      className="w-full cursor-pointer flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#fc5123] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      {t.nav.howItWorks}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <LanguageSwitcher />
            </div>

            <div>
              <button
                onClick={onLoginClick}
                className="bg-[#fc5123] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#e63946] transition-colors shadow-lg shadow-orange-500/30 text-sm"
              >
                {t.nav.login}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideUp">
              <div className="inline-block bg-orange-100 text-[#fc5123] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                {t.hero.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1f2024] leading-tight mb-6">
                {t.hero.title1}
                <br />
                <span className="text-[#fc5123]">{t.hero.title2}</span>
              </h1>
              <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed max-w-lg">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onLoginClick}
                  className="bg-[#fc5123] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#e63946] transition-colors shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2"
                >
                  {t.hero.findMechanic}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>

              
            </div>

            <div
              className="relative animate-slideUp"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1675034743126-0f250a5fee51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWNoYW5pYyUyMHJlcGFpciUyMHdvcmtzaG9wJTIwbW9kZXJufGVufDF8fHx8MTc3MDQzMTMxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="App Preview"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">
                          {t.demo.foundMechanic}
                        </p>
                        <p className="text-white/80 text-sm">
                          {t.demo.mechanicOnWay}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-[#fc5123] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div
                className="absolute top-12 -left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[200px] animate-float"
                style={{ animation: 'float 4s ease-in-out infinite' }}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-800">{15} {t.common.minutes}</p>
                  <p className="text-xs text-gray-500">
                    {t.common.averageTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2024] mb-4">
              {t.services.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.services.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4 animate-hover-scale"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2">
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[#1f2024] mb-1">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section
        id="demo"
        className="py-24 bg-[#1f2024] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fc5123]/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <PhoneDemo />
            </div>

            <div className="order-1 lg:order-2 text-white">
              <div className="inline-block bg-[#fc5123]/20 text-[#fc5123] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-[#fc5123]/30">
                {t.demo.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {t.demo.title1}
                <br />
                <span className="text-[#fc5123]">{t.demo.title2}</span>

              </h2>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {t.demo.description}
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  t.demo.feature1,
                  t.demo.feature2,
                  t.demo.feature3,
                  t.demo.feature4,
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#fc5123] flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#fc5123] font-bold tracking-wider uppercase text-sm">
              {t.howItWorks.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2024] mt-2 mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              {t.howItWorks.description}
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-gray-50 via-gray-200 to-gray-50 -z-10"></div>

            {/* Connecting Line (Mobile) */}
            <div className="md:hidden absolute top-0 bottom-0 left-10 w-1 bg-gradient-to-b from-gray-50 via-gray-200 to-gray-50 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {[
                {
                  title: t.howItWorks.step1Title,
                  desc: t.howItWorks.step1Desc,
                  icon: AlertCircle,
                },
                {
                  title: t.howItWorks.step2Title,
                  desc: t.howItWorks.step2Desc,
                  icon: MapPin,
                },
                {
                  title: t.howItWorks.step3Title,
                  desc: t.howItWorks.step3Desc,
                  icon: Wrench,
                },
                {
                  title: t.howItWorks.step4Title,
                  desc: t.howItWorks.step4Desc,
                  icon: Wallet,
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-6 animate-slideUp"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="bg-white p-2 rounded-full ring-4 ring-white">
                    <div className="w-16 h-16 rounded-2xl bg-[#fff0e6] text-[#fc5123] flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/10 border border-orange-100 relative z-10">
                      <step.icon className="w-8 h-8" strokeWidth={1.5} />
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#fc5123] rounded-full text-white flex items-center justify-center text-sm font-bold border-4 border-white shadow-md">
                        {idx + 1}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 md:text-center pt-2">
                    <h3 className="text-xl font-bold text-[#1f2024] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-[#fc5123] rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t.cta.title}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={onLoginClick}
                className="bg-white text-[#fc5123] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                {t.cta.loginNow}
              </button>
              <button className="bg-[#e63946] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d62839] transition-colors border border-white/20">
                {t.cta.downloadApp}
              </button>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f2024] text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-14   h-14  rounded-lg flex items-center justify-center text-white font-bold">
                   <img
                className="w-full h-full object-contain rounded-lg shadow-lg shadow-orange-500/30 "
                src="https://res.cloudinary.com/djprssm3o/image/upload/v1771942060/Login_p1rc6t.png"
                alt="Fixee Logo"
              ></img>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.footer.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 ">{t.footer.aboutFixee}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-[#fc5123]">
                    {t.footer.about}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fc5123]">
                    {t.footer.careers}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fc5123]">
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fc5123]">
                    {t.footer.privacy}
                  </a>
                </li>
              </ul>
            </div>

            {/* <div>
              <h4 className="font-bold text-lg mb-4">{t.footer.servicesTitle}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-[#fc5123]">
                    {t.footer.motorcycleRescue}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fc5123]">
                    {t.footer.maintenance}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fc5123]">
                    {t.footer.technicalConsulting}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fc5123]">
                    {t.footer.pricing}
                  </a>
                </li>
              </ul>
            </div> */}

            <div>
              <h4 className="font-bold text-lg mb-4">{t.footer.contact}</h4>
              <ul className="space-y-2 text-gray-40">Liên hệ</ul>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Hotline: 0389648022</li>
                <li>Email: fixee@gmail.com</li>
                <li>Địa chỉ: TP. Đà Nẵng, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © 2024 Fixee. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
