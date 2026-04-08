import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, User } from "lucide-react";
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
  createdAt: Timestamp;
}

const News = () => {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const snap = await getDocs(collection(db, "news"));
      const newsData = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as NewsPost))
        .filter(post => post.status === "published") // Only show published posts
        .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()); // Sort by newest first
      setNewsPosts(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-8 bg-navy-dark">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Stay Informed</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              News & Insights
            </h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">
              Loading news articles...
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-8 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Stay Informed</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            News & Insights
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Stay updated with the latest Dubai real estate news, market insights, and investment opportunities.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {newsPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No news articles available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsPosts.map((post) => {
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
                        to={`/news/${post.id}`}
                        className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default News;