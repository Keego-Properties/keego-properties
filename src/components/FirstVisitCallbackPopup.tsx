import { useEffect, useState } from "react";
import { X, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import logoImage from "@/assets/eagb.png";

const FIRST_VISIT_POPUP_KEY = "keego:first-visit-popup-shown";

const FirstVisitCallbackPopup = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", agreed: false });

  useEffect(() => {
    const alreadyShown = localStorage.getItem(FIRST_VISIT_POPUP_KEY) === "1";
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 800);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  const handleClose = () => {
    localStorage.setItem(FIRST_VISIT_POPUP_KEY, "1");
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.agreed) return;

    const normalizedPhone = form.phone.trim().startsWith("+")
      ? form.phone.trim()
      : `+971 ${form.phone.trim()}`;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "submissions"), {
        source: "callback_popup",
        name: form.name.trim(),
        phone: normalizedPhone,
        message: "Customer requested an immediate callback from first-visit popup.",
        createdAt: Timestamp.now(),
      });

      toast({
        title: "Request received",
        description: "Our team will call you shortly.",
      });

      localStorage.setItem(FIRST_VISIT_POPUP_KEY, "1");
      setOpen(false);
    } catch (error) {
      console.error("First-visit popup submission failed:", error);
      toast({
        title: "Unable to submit",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4">
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(2,6,23,0.35)]">
        <button
          type="button"
          aria-label="Close popup"
          onClick={handleClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex justify-center">
          <img src={logoImage} alt="KeeGo Properties" className="h-14 w-auto object-contain" />
        </div>

        <h2 className="text-center font-serif text-3xl font-bold text-[#121d46]">Get a call in a few minutes</h2>
        <p className="mt-3 text-center text-xl font-semibold leading-tight text-[#121d46]">
          Leave your number below
          <br />
          and we will call you right away!
        </p>

        <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
          <label className="mb-1 block text-sm font-semibold text-[#121d46]">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="mb-3 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-gold focus:outline-none"
            placeholder="Your name"
          />

          <label className="mb-1 block text-sm font-semibold text-[#121d46]">Enter your number</label>
          <div className="mb-3 flex gap-2">
            <div className="flex h-10 items-center gap-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700">
              <Phone className="h-4 w-4 text-[#121d46]" />
              +971
            </div>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="h-10 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-gold focus:outline-none"
              placeholder="54 391 2231"
            />
            <button
              type="submit"
              disabled={submitting || !form.agreed}
              className="h-10 rounded-md bg-[#121d46] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1a2a63] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Call me!"}
            </button>
          </div>

          <label className="inline-flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e) => setForm((prev) => ({ ...prev, agreed: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded border-slate-400 text-[#121d46] focus:ring-[#121d46]"
            />
            <span>
              I agree with the
              {" "}
              <Link to="/privacy-policy" className="font-medium text-[#121d46] underline hover:text-[#1a2a63]">
                privacy policy
              </Link>
            </span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default FirstVisitCallbackPopup;
