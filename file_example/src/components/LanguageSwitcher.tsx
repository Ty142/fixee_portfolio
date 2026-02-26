import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 text-gray-600 hover:text-[#fc5123] rounded-lg hover:bg-orange-50 transition-colors focus:outline-none flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <span className="text-sm font-medium uppercase">{language}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-white p-1 shadow-xl border-gray-100 rounded-xl mt-2"
      >
        <DropdownMenuItem
          onClick={() => setLanguage('vi')}
          className={`cursor-pointer flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            language === 'vi'
              ? 'bg-orange-50 text-[#fc5123]'
              : 'text-gray-700 hover:text-[#fc5123] hover:bg-orange-50'
          }`}
        >
          <span className="mr-2">🇻🇳</span>
          Tiếng Việt
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`cursor-pointer flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            language === 'en'
              ? 'bg-orange-50 text-[#fc5123]'
              : 'text-gray-700 hover:text-[#fc5123] hover:bg-orange-50'
          }`}
        >
          <span className="mr-2">🇬🇧</span>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
