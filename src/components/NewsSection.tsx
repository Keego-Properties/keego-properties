import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  status: "published" | "draft";
  featured: boolean;
  createdAt: Timestamp;
}

const NewsSection = () => {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const snap = await getDocs(collection(db, "news"));
        const newsData = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as NewsPost))
          .filter(post => post.status === "published" && (post.featured === true))
          .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
          .slice(0, 3);

        setNewsPosts(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
            to="/news"
            className="hidden md:flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all duration-300"
          >
            View All News
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsPosts.length === 0 ? (
            <div className="col-span-3 text-center py-8">
              <p className="text-muted-foreground">No news articles available at the moment.</p>
            </div>
          ) : (
            newsPosts.map((post) => {
              const slug = generateSlug(post.title);
              return (
                <article key={post.id} className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover-lift block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-gold/90 text-primary-foreground">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.createdAt.toDate().toLocaleDateString()}</span>
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/news/${slug}`}
                      className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;