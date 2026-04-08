import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
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

type FormState = {
  title: string; excerpt: string; content: string; image: string;
  category: string; author: string; status: "published" | "draft";
};

const emptyForm: FormState = {
  title: "", excerpt: "", content: "", image: "",
  category: "Market Update", author: "", status: "draft",
};

const NewsManager = () => {
  const [items, setItems] = useState<NewsPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "news"));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as NewsPost)));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      const data = { ...form, updatedAt: Timestamp.now() };
      if (editId) {
        await updateDoc(doc(db, "news", editId), data);
        toast({ title: "Post updated" });
      } else {
        await addDoc(collection(db, "news"), { ...data, createdAt: Timestamp.now() });
        toast({ title: "Post added" });
      }
      setForm(emptyForm);
      setShowForm(false);
      setEditId(null);
      fetchItems();
    } catch {
      toast({ title: "Error saving", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (n: NewsPost) => {
    setForm({
      title: n.title, excerpt: n.excerpt || "", content: n.content,
      image: n.image || "", category: n.category || "Market Update",
      author: n.author || "", status: n.status || "draft",
    });
    setEditId(n.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "news", id));
    toast({ title: "Post deleted" });
    fetchItems();
  };

  const togglePublish = async (n: NewsPost) => {
    const next = n.status === "published" ? "draft" : "published";
    await updateDoc(doc(db, "news", n.id), { status: next, updatedAt: Timestamp.now() });
    toast({ title: `Post ${next}` });
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">News & Blog</h1>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Add Post
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{editId ? "Edit" : "Add"} Post</h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Market Update">Market Update</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Company News">Company News</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({...form, status: v as "published"|"draft"})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Excerpt</Label>
              <Textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows={2} placeholder="Short summary..." />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Content</Label>
              <Textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={6} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={loading}>{loading ? "Saving..." : editId ? "Update" : "Add"} Post</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Author</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No posts yet.</td></tr>
              )}
              {items.map(n => (
                <tr key={n.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{n.title}</td>
                  <td className="p-3"><Badge variant="outline">{n.category}</Badge></td>
                  <td className="p-3 text-muted-foreground">{n.author}</td>
                  <td className="p-3">
                    <Badge className={n.status === "published" ? "bg-emerald-500 text-white" : ""}
                      variant={n.status === "published" ? "default" : "secondary"}>
                      {n.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => togglePublish(n)}>
                        {n.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(n)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(n.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsManager;
