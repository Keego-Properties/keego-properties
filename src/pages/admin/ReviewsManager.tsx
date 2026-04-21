import { useEffect, useState } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Star, Eye, EyeOff } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  published: boolean;
  createdAt: Timestamp;
}

type FormState = {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  published: boolean;
};

const emptyForm: FormState = {
  name: "",
  role: "",
  location: "",
  rating: 5,
  text: "",
  avatar: "",
  published: false,
};

const ReviewsManager = () => {
  const [items, setItems] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "reviews"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
    data.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setLoading(true);
    try {
      const data = { ...form, updatedAt: Timestamp.now() };
      if (editId) {
        await updateDoc(doc(db, "reviews", editId), data);
        toast({ title: "Review updated" });
      } else {
        await addDoc(collection(db, "reviews"), { ...data, createdAt: Timestamp.now() });
        toast({ title: "Review added" });
      }
      setForm(emptyForm);
      setShowForm(false);
      setEditId(null);
      fetchItems();
    } catch (err) {
      console.error(err);
      toast({ title: "Error saving review", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (r: Review) => {
    setForm({
      name: r.name,
      role: r.role || "",
      location: r.location || "",
      rating: r.rating ?? 5,
      text: r.text,
      avatar: r.avatar || "",
      published: r.published ?? false,
    });
    setEditId(r.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await deleteDoc(doc(db, "reviews", id));
    toast({ title: "Review deleted" });
    fetchItems();
  };

  const togglePublish = async (r: Review) => {
    const next = !r.published;
    await updateDoc(doc(db, "reviews", r.id), { published: next, updatedAt: Timestamp.now() });
    toast({ title: next ? "Review published" : "Review unpublished" });
    fetchItems();
  };

  const publishedCount = items.filter((r) => r.published).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Client Reviews</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {publishedCount} published · {items.length - publishedCount} hidden
          </p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Add Review
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{editId ? "Edit" : "Add"} Review</h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Client Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. James Whitfield"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Role / Title</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Property Investor"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. London, UK"
              />
            </div>
            <div className="space-y-2">
              <Label>Rating</Label>
              <Select
                value={String(form.rating)}
                onValueChange={(v) => setForm({ ...form, rating: Number(v) })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {"★".repeat(n)}{"☆".repeat(5 - n)} ({n}/5)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Avatar URL</Label>
              <Input
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                placeholder="https://... (leave blank for initials fallback)"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Review Text *</Label>
              <Textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                rows={4}
                placeholder="What did the client say?"
                required
              />
            </div>

            {/* Publish toggle */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  form.published
                    ? "bg-green-50 text-green-700 border-green-300"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {form.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {form.published ? "Will be published on site" : "Draft — not visible on site"}
              </button>
            </div>

            <div className="md:col-span-2 flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editId ? "Update Review" : "Add Review"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => { setShowForm(false); setEditId(null); }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No reviews yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((review) => (
              <div key={review.id} className="flex items-start gap-4 p-4">
                {/* Avatar */}
                <div className="shrink-0">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {review.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="font-medium text-foreground text-sm">{review.name}</span>
                    {review.role && (
                      <span className="text-xs text-muted-foreground">{review.role}</span>
                    )}
                    {review.location && (
                      <span className="text-xs text-muted-foreground">· {review.location}</span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${s < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{review.text}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(review)}
                    title={review.published ? "Unpublish" : "Publish"}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                      review.published
                        ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                    }`}
                  >
                    {review.published ? (
                      <><Eye className="w-3.5 h-3.5" /> Published</>
                    ) : (
                      <><EyeOff className="w-3.5 h-3.5" /> Draft</>
                    )}
                  </button>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(review)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(review.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsManager;
