"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import bannerImg from "@/assets/hero-dubai.jpg";

const PromoBanner = () => {
  return (
    <section className="relative w-full h-96 md:h-[36rem] overflow-hidden">
      {/* Background image */}
      <img
        src={bannerImg.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex h-full max-w-7xl flex-col items-center justify-center gap-6 px-6 text-center md:flex-row md:items-center md:justify-start md:gap-24 md:px-16 md:text-left">
        {/* Left: big heading */}
        <h2 className="max-w-xs shrink-0 font-serif text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
          Find your<br />dream home
        </h2>

        {/* Divider */}
        <div className="hidden md:block w-px self-stretch bg-white/25 my-8" />

        {/* Right: description + CTA */}
        <div className="flex flex-col items-center gap-5 md:items-start">
          <p className="max-w-md text-base leading-relaxed text-white/80 md:text-lg">
            Explore our curated collection of luxury properties across Dubai's most
            sought-after communities. Your next chapter starts here.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 border border-white/70 px-6 py-2.5 text-sm text-white transition-colors duration-200 hover:bg-white hover:text-black"
          >
            Discover our properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
