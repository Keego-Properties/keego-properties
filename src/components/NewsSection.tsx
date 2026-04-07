import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import communityDowntown from "@/assets/community-downtown.jpg";
import communityMarina from "@/assets/community-marina.jpg";
import communityPalm from "@/assets/community-palm.jpg";

const articles = [
  {
    image: communityDowntown,
    category: "Market Insights",
    date: "March 15, 2026",
    title: "Dubai Real Estate Market Reaches Record Highs in Q1 2026",
  },
  {
    image: communityMarina,
    category: "Investment",
    date: "March 10, 2026",
    title: "Top 5 Communities for Investment Returns in Dubai",
  },
  {
    image: communityPalm,
    category: "News",
    date: "March 5, 2026",
    title: "New Luxury Waterfront Development Announced in Dubai",
  },
];

const NewsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">
              Stay Informed
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              News & Insights
            </h2>
          </div>
          <Link
            to="/contact"
            className="hidden md:flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all duration-300"
          >
            View All News
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="group cursor-pointer hover-lift">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <span className="absolute top-4 left-4 bg-gold text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-2">
                {article.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
