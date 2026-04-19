import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import bannerImg from "@/assets/hero-dubai.jpg";

const PromoBanner = () => {
  return (
    <section className="relative w-full h-64 md:h-80 overflow-hidden">
      {/* Background image */}
      <img
        src={bannerImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-8 md:px-16 flex items-center gap-12 md:gap-24">
        {/* Left: big heading */}
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight shrink-0 max-w-xs">
          Find your<br />dream home
        </h2>

        {/* Divider */}
        <div className="hidden md:block w-px self-stretch bg-white/25 my-8" />

        {/* Right: description + CTA */}
        <div className="flex flex-col gap-5">
          <p className="text-white/80 text-base md:text-lg max-w-md leading-relaxed">
            Explore our curated collection of luxury properties across Dubai's most
            sought-after communities. Your next chapter starts here.
          </p>
          <Link
            to="/properties"
            className="self-start inline-flex items-center gap-2 border border-white/70 text-white text-sm px-6 py-2.5 hover:bg-white hover:text-black transition-colors duration-200"
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
