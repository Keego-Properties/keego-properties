"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { collection, getDocs, getDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft, Share2, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/Seo";
import { truncate } from "@/lib/seo";
import { getRouteParam } from "@/lib/utils";

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

const BlogDetail = () => {
  const { id: idParam } = useParams();
  const id = getRouteParam(idParam);
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docSnap = await getDoc(doc(db, "blogs", id));
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as BlogPost;
          setPost(data);

          // Fetch related posts (same category, published, excluding current)
          const allSnap = await getDocs(collection(db, "blogs"));
          const related = allSnap.docs
            .map((d) => ({ id: d.id, ...d.data() } as BlogPost))
            .filter(
              (p) =>
                p.id !== data.id &&
                p.category === data.category &&
                p.status === "published"
            )
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const sharePost = () => {
    navigator.share?.({
      title: post?.title,
      text: `Check out this article: ${post?.title}`,
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
          <p className="text-muted-foreground">Loading article…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link href="/blogs" className="text-gold hover:underline">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Seo
        title={`${post.title} | Real Estate Blog | KeeGo Properties`}
        description={truncate(post.excerpt || post.content, 160)}
        image={post.image}
        type="article"
        path={`/blogs/${id}`}
        publishedTime={post.createdAt?.toDate().toISOString()}
        author={post.author || "KeeGo Properties"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt || post.content,
          image: post.image ? [post.image] : undefined,
          datePublished: post.createdAt?.toDate().toISOString(),
          author: {
            "@type": "Person",
            name: post.author || "KeeGo Properties",
          },
          publisher: {
            "@type": "Organization",
            name: "KeeGo Properties",
          },
        }}
      />
      <Navbar />

      {/* Hero image */}
      {post.image && (
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/50 via-transparent to-navy-dark/70" />
        </div>
      )}

      <div className={`container mx-auto px-4 ${post.image ? "-mt-24 relative z-10" : "pt-32"} pb-20`}>
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Card */}
          <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-gold/90 text-primary-foreground">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-amber-500 text-white">Featured</Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.createdAt.toDate().toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={sharePost} className="ml-auto gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground mb-8 italic border-l-4 border-gold pl-4">
                  {post.excerpt}
                </p>
              )}

              {/* Content — newline-aware rendering */}
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {post.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-foreground/80 leading-relaxed mb-5 whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>

              {post.tags && (
                <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.split(",").map((tag) => (
                    <span
                      key={tag.trim()}
                      className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    href={`/blogs/${related.id}`}
                    key={related.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover-lift"
                  >
                    {related.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <Badge variant="outline" className="mb-3 text-xs">
                        {related.category}
                      </Badge>
                      <h3 className="font-serif font-bold text-foreground group-hover:text-gold transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        {related.createdAt.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
