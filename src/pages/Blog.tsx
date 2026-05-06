import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  tags: string;
  status: "published" | "draft";
  featured: boolean;
  createdAt: Timestamp;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filtered, setFiltered] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snap = await getDocs(collection(db, "blogs"));
        const data = snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as BlogPost))
          .filter((p) => p.status === "published")
          .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
        setPosts(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    setFiltered(cat === "All" ? posts : posts.filter((p) => p.category === cat));
  };

  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = filtered.filter((p) => !p.featured || activeCategory !== "All");

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-8 bg-navy-dark">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Our Blog</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Insights & Stories
            </h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">Loading articles…</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero header */}
      <section className="pt-32 pb-10 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Our Blog</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Insights & Stories
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Expert tips, market insights, and lifestyle stories from the KeeGo Properties team.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && activeCategory === "All" && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-xs mb-6">Featured Article</p>
            <Link to={`/blogs/${featuredPost.id}`} className="group grid md:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover-lift">
              <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                {featuredPost.image ? (
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center min-h-[260px]">
                    <span className="text-muted-foreground text-sm">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/40 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-gold/90 text-primary-foreground">
                  {featuredPost.category}
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.createdAt.toDate().toLocaleDateString()}</span>
                  </div>
                  {featuredPost.author && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                  )}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">
                  {featuredPost.title}
                </h2>
                {featuredPost.excerpt && (
                  <p className="text-muted-foreground line-clamp-3 mb-6">{featuredPost.excerpt}</p>
                )}
                <span className="inline-flex items-center gap-2 text-gold font-medium text-sm">
                  Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filter + grid */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {regularPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover-lift"
                >
                  <Link to={`/blogs/${post.id}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">No image</span>
                        </div>
                      )}
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
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                      )}
                      {post.tags && (
                        <div className="flex items-center gap-1 flex-wrap mb-4">
                          <Tag className="w-3 h-3 text-muted-foreground" />
                          {post.tags.split(",").map((t) => (
                            <span key={t.trim()} className="text-xs text-muted-foreground">
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="inline-flex items-center gap-2 text-gold font-medium text-sm">
                        Read More{" "}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
