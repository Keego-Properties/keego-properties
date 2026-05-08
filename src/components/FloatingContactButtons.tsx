import { Phone } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.6 2 2.18 6.42 2.18 11.85c0 1.74.45 3.44 1.31 4.95L2 22l5.35-1.4a9.8 9.8 0 0 0 4.68 1.19h.01c5.43 0 9.85-4.42 9.85-9.85a9.78 9.78 0 0 0-2.84-7.03Zm-7.02 15.22h-.01a8.15 8.15 0 0 1-4.14-1.13l-.3-.18-3.18.83.85-3.1-.2-.32a8.14 8.14 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.17-8.16a8.1 8.1 0 0 1 5.78 2.39 8.11 8.11 0 0 1 2.38 5.78c0 4.5-3.67 8.16-8.1 8.27Zm4.48-6.12c-.24-.12-1.43-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.64-1.19-1.43-1.33-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.31.98 2.47c.12.16 1.69 2.59 4.1 3.63.57.25 1.02.4 1.37.52.58.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

const phoneNumber = "+971543912231";
const whatsappNumber = "971543912231";

const FloatingContactButtons = () => {
  return (
    <div className="fixed bottom-6 right-4 z-[70] flex flex-col gap-2.5 items-end sm:bottom-8 sm:right-6">
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call KeeGo Properties"
        className="group relative inline-flex items-center gap-1 rounded-full bg-[#0f172a] px-2 py-1 text-white shadow-[0_16px_36px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:scale-105"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#0f172a]/35 animate-ping" />
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0f172a] ring-2 ring-[#0f172a]/10">
          <Phone className="h-3 w-3 group-hover:rotate-12 transition-transform duration-200" />
        </span>
        <span className="pr-0.5 text-[10px] font-semibold tracking-[0.08em] uppercase">Call now</span>
      </a>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-9 w-auto px-2 items-center justify-center rounded-full bg-[#25D366] text-white text-xs font-semibold shadow-[0_16px_36px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105"
      >
        <WhatsAppIcon className="h-5 w-5 mr-1.5" />
        WhatsApp
      </a>
    </div>
  );
};

export default FloatingContactButtons;