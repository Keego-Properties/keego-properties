import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, getDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

const NewsDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newsPost, setNewsPost] = useState<NewsPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsPost = async () => {
      if (!id) return;

      try {
        // Fetch specific news post by document ID
        const newsDoc = await getDoc(doc(db, "news", id));

        if (newsDoc.exists()) {
          const newsData = { id: newsDoc.id, ...newsDoc.data() } as NewsPost;
          setNewsPost(newsData);

          // Fetch related posts (same category, excluding current post)
          const allNewsSnap = await getDocs(collection(db, "news"));
          const related = allNewsSnap.docs
            .map(d => ({ id: d.id, ...d.data() } as NewsPost))
            .filter(post => post.id !== newsData.id && post.category === newsData.category && post.status === "published")
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          // News post not found
          setNewsPost(null);
        }
      } catch (error) {
        console.error("Error fetching news post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsPost();
  }, [id]);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const shareArticle = () => {
    navigator.share?.({
      title: newsPost?.title,
      text: `Check out this article: ${newsPost?.title}`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard" });
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <p className="text-muted-foreground">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!newsPost) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/news" className="text-gold hover:underline">Back to News</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img src={newsPost.image} alt={newsPost.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-4">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link to="/news" className="hover:text-gold transition-colors">News</Link>
              <span>/</span>
              <span className="text-primary-foreground">{newsPost.title}</span>
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-gold/90 text-primary-foreground">
                {newsPost.category}
              </Badge>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {newsPost.title}
            </h1>
            <div className="flex items-center gap-6 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{newsPost.createdAt.toDate().toLocaleDateString()}</span>
              </div>
              {newsPost.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{newsPost.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/news"
                className="flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
              </Link>
              <Button variant="outline" onClick={shareArticle}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>

            {/* Excerpt */}
            <div className="mb-8">
              <p className="text-xl text-muted-foreground leading-relaxed italic">
                {newsPost.excerpt}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {newsPost.content}
              </div>
            </div>

            {/* Article Meta */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                  Published on {newsPost.createdAt.toDate().toLocaleDateString()}
                  {newsPost.author && ` by ${newsPost.author}`}
                </div>
                <div className="flex items-center gap-4">
                  <span>Category: {newsPost.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => {
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
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
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
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default NewsDetail;