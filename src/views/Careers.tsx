"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Briefcase, MapPin, Clock, ChevronDown, ChevronUp,
  TrendingUp, Users, Globe, ArrowRight, Star, Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  status: "open" | "closed";
  featured: boolean;
}

const perks = [
  {
    icon: TrendingUp,
    title: "Industry-Leading Rewards",
    desc: "Competitive commissions, performance bonuses, and a comprehensive benefits package designed to recognise exceptional talent.",
  },
  {
    icon: Star,
    title: "World-Class Training",
    desc: "Structured onboarding, mentorship from top-performing agents, and continuous learning programs to sharpen your edge.",
  },
  {
    icon: Globe,
    title: "Global Reach, Local Depth",
    desc: "Work with an international clientele across Dubai's most prestigious communities, backed by deep market intelligence.",
  },
  {
    icon: Users,
    title: "Inclusive Culture",
    desc: "A team of 200+ professionals from over 30 nationalities united by ambition, integrity, and a passion for real estate.",
  },
];

const typeColor: Record<string, string> = {
  "Full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Part-time": "bg-sky-50 text-sky-700 border-sky-200",
  "Contract": "bg-violet-50 text-violet-700 border-violet-200",
  "Internship": "bg-amber-50 text-amber-700 border-amber-200",
};

const Careers = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const snap = await getDocs(collection(db, "careers"));
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as JobOpening));
      const open = all
        .filter((j) => j.status === "open")
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      setJobs(open);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 bg-[#0b1628] overflow-hidden">
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* gold accent blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/8 blur-[80px] pointer-events-none" />

        <div className="relative container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 text-[#D4AF37] font-medium tracking-[0.25em] uppercase text-xs mb-5 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 bg-[#D4AF37]/5">
            <Briefcase className="w-3.5 h-3.5" /> Join Our Team
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
            Shape the Future of<br />
            <span className="text-[#D4AF37]">Dubai Real Estate</span>
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Join KeeGo Properties — Dubai's most trusted real estate platform — and build a career that's as exceptional as the properties we represent.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#openings"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c9a72f] text-[#0b1628] font-semibold px-7 py-3.5 rounded-full transition-colors shadow-[0_8px_24px_rgba(212,175,55,0.35)]"
            >
              View Openings <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:careers@keegoproperties.com"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-medium px-7 py-3.5 rounded-full transition-colors"
            >
              <Mail className="w-4 h-4" /> Send Your CV
            </a>
          </div>
        </div>
      </section>

      {/* ── Hero image strip ── */}
      <div className="relative h-[340px] md:h-[440px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80"
          alt="KeeGo Properties team"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1628]/40 via-transparent to-[#fafaf9]" />
      </div>

      {/* ── Perks ── */}
      <section className="py-24 bg-[#fafaf9]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
            <div>
              <p className="text-[#D4AF37] font-medium tracking-[0.2em] uppercase text-xs mb-3">Why KeeGo</p>
              <h2 className="font-serif text-4xl font-bold text-[#0b1628] mb-4">A Career Worth Choosing</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                We invest in our people the same way we invest in premium property — with purpose, vision, and unwavering commitment. Every team member at KeeGo is empowered to grow, lead, and excel.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.12)] aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                alt="Our hiring culture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1628]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
                <p className="text-[#0b1628] font-semibold text-sm">200+ Team Members</p>
                <p className="text-slate-500 text-xs">Across 30+ nationalities</p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="group bg-white rounded-2xl border border-slate-100 p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-5">
                  <perk.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold text-[#0b1628] text-base mb-2">{perk.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job Openings ── */}
      <section id="openings" className="py-24 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] font-medium tracking-[0.2em] uppercase text-xs mb-3">Opportunities</p>
            <h2 className="font-serif text-4xl font-bold text-[#0b1628]">Current Openings</h2>
            <p className="text-slate-500 mt-3 text-sm">
              {loading ? "Loading positions…" : jobs.length > 0 ? `${jobs.length} position${jobs.length !== 1 ? "s" : ""} available` : "No open positions right now"}
            </p>
          </div>

          {loading ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="max-w-xl mx-auto text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-[#fafaf9]">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5">
                <Briefcase className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <p className="font-serif text-xl font-bold text-[#0b1628] mb-2">No open positions at the moment</p>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                We're always on the lookout for exceptional talent. Send us your CV and we'll be in touch when the right role comes up.
              </p>
              <a
                href="mailto:careers@keegoproperties.com"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c9a72f] text-[#0b1628] font-semibold px-6 py-3 rounded-full transition-colors text-sm"
              >
                <Mail className="w-4 h-4" /> careers@keegoproperties.com
              </a>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {jobs.map((job) => {
                const isOpen = expandedId === job.id;
                return (
                  <div
                    key={job.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-[#D4AF37]/50 shadow-[0_4px_24px_rgba(212,175,55,0.12)]"
                        : "border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
                    } bg-white`}
                  >
                    {/* Header row */}
                    <button
                      className="w-full text-left px-7 py-6 flex items-start justify-between gap-4"
                      onClick={() => toggle(job.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {job.featured && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/6 rounded-full px-2.5 py-0.5">
                              <Star className="w-2.5 h-2.5 fill-current" /> Featured
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#0b1628] mb-2 leading-tight">{job.title}</h3>
                        <div className="flex flex-wrap gap-3">
                          {job.department && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                              <Briefcase className="w-3.5 h-3.5" /> {job.department}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-0.5 ${
                              typeColor[job.type] ?? "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            <Clock className="w-3 h-3" /> {job.type}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isOpen ? "bg-[#D4AF37] text-[#0b1628]" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Expanded body */}
                    {isOpen && (
                      <div className="px-7 pb-7 border-t border-slate-100">
                        <div className="pt-6 grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2">About the Role</p>
                            <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{job.description}</p>
                          </div>
                          {job.requirements && (
                            <div>
                              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2">Requirements</p>
                              <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{job.requirements}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <a
                            href={`mailto:careers@keegoproperties.com?subject=Application: ${encodeURIComponent(job.title)}`}
                            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c9a72f] text-[#0b1628] font-semibold px-6 py-2.5 rounded-full transition-colors text-sm shadow-[0_4px_16px_rgba(212,175,55,0.3)]"
                          >
                            Apply Now <ArrowRight className="w-4 h-4" />
                          </a>
                          <span className="text-xs text-slate-400">via careers@keegoproperties.com</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-[#0b1628]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#D4AF37] font-medium tracking-[0.2em] uppercase text-xs mb-4">Don't See Your Role?</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            We're Always Looking for<br />Exceptional People
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Send your CV and a brief introduction to our team — we'll keep your profile on file and reach out when the perfect opportunity arises.
          </p>
          <a
            href="mailto:careers@keegoproperties.com"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c9a72f] text-[#0b1628] font-semibold px-8 py-4 rounded-full transition-colors shadow-[0_8px_28px_rgba(212,175,55,0.3)] text-sm"
          >
            <Mail className="w-4 h-4" /> careers@keegoproperties.com
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
