import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  highlights: string;
  propertiesCount: number;
  avgPrice: string;
  createdAt: Timestamp;
}

const emptyForm = {
  name: "", description: "", image: "", location: "",
  highlights: "", propertiesCount: 0, avgPrice: "",
};

const CommunitiesManager = () => {
  const [items, setItems] = useState<Community[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "communities"));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Community)));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      const data = { ...form, propertiesCount: Number(form.propertiesCount), updatedAt: Timestamp.now() };
      if (editId) {
        await updateDoc(doc(db, "communities", editId), data);
        toast({ title: "Community updated" });
      } else {
        await addDoc(collection(db, "communities"), { ...data, createdAt: Timestamp.now() });
        toast({ title: "Community added" });
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

  const handleEdit = (c: Community) => {
    setForm({
      name: c.name, description: c.description, image: c.image,
      location: c.location || "", highlights: c.highlights || "",
      propertiesCount: c.propertiesCount || 0, avgPrice: c.avgPrice || "",
    });
    setEditId(c.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this community?")) return;
    await deleteDoc(doc(db, "communities", id));
    toast({ title: "Community deleted" });
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">Communities</h1>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Add Community
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{editId ? "Edit" : "Add"} Community</h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Avg. Price</Label>
              <Input value={form.avgPrice} onChange={e => setForm({...form, avgPrice: e.target.value})} placeholder="AED 2,000,000" />
            </div>
            <div className="space-y-2">
              <Label>Properties Count</Label>
              <Input type="number" min={0} value={form.propertiesCount} onChange={e => setForm({...form, propertiesCount: Number(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Highlights (comma-separated)</Label>
              <Input value={form.highlights} onChange={e => setForm({...form, highlights: e.target.value})} placeholder="Beachfront, Family, Schools" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={loading}>{loading ? "Saving..." : editId ? "Update" : "Add"} Community</Button>
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
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Location</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Properties</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Avg. Price</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No communities yet.</td></tr>
              )}
              {items.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{c.name}</td>
                  <td className="p-3 text-muted-foreground">{c.location}</td>
                  <td className="p-3 text-muted-foreground">{c.propertiesCount}</td>
                  <td className="p-3 text-muted-foreground">{c.avgPrice}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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

export default CommunitiesManager;
