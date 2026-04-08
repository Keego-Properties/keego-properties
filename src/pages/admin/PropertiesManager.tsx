import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  type: "sale" | "rent";
  status: "available" | "sold" | "rented";
  description: string;
  image: string;
  developer: string;
  amenities: string;
  createdAt: Timestamp;
}

const emptyForm = {
  title: "", price: "", location: "", beds: 1, baths: 1,
  area: "", type: "sale" as const, status: "available" as const,
  description: "", image: "", developer: "", amenities: "",
};

const PropertiesManager = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchProperties = async () => {
    const snap = await getDocs(collection(db, "properties"));
    setProperties(snap.docs.map(d => ({ id: d.id, ...d.data() } as Property)));
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price.trim()) return;
    setLoading(true);
    try {
      const data = { ...form, beds: Number(form.beds), baths: Number(form.baths), updatedAt: Timestamp.now() };
      if (editId) {
        await updateDoc(doc(db, "properties", editId), data);
        toast({ title: "Property updated" });
      } else {
        await addDoc(collection(db, "properties"), { ...data, createdAt: Timestamp.now() });
        toast({ title: "Property added" });
      }
      setForm(emptyForm);
      setShowForm(false);
      setEditId(null);
      fetchProperties();
    } catch {
      toast({ title: "Error saving property", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p: Property) => {
    setForm({
      title: p.title, price: p.price, location: p.location,
      beds: p.beds, baths: p.baths, area: p.area,
      type: p.type, status: p.status, description: p.description,
      image: p.image, developer: p.developer || "", amenities: p.amenities || "",
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await deleteDoc(doc(db, "properties", id));
    toast({ title: "Property deleted" });
    fetchProperties();
  };

  const toggleStatus = async (p: Property) => {
    const next = p.status === "available"
      ? (p.type === "sale" ? "sold" : "rented")
      : "available";
    await updateDoc(doc(db, "properties", p.id), { status: next });
    toast({ title: `Marked as ${next}` });
    fetchProperties();
  };

  const statusBadge = (status: string) => {
    if (status === "sold") return <Badge variant="destructive">Sold</Badge>;
    if (status === "rented") return <Badge variant="secondary">Rented</Badge>;
    return <Badge className="bg-emerald-500 text-white">Available</Badge>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">Properties</h1>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Add Property
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{editId ? "Edit" : "Add"} Property</h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Price *</Label>
              <Input value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="AED 1,500,000" required />
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
              <Label>Beds</Label>
              <Input type="number" min={0} value={form.beds} onChange={e => setForm({...form, beds: Number(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Baths</Label>
              <Input type="number" min={0} value={form.baths} onChange={e => setForm({...form, baths: Number(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Area</Label>
              <Input value={form.area} onChange={e => setForm({...form, area: e.target.value})} placeholder="1,200 sq.ft" />
            </div>
            <div className="space-y-2">
              <Label>Developer</Label>
              <Input value={form.developer} onChange={e => setForm({...form, developer: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={v => setForm({...form, type: v as "sale"|"rent"})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({...form, status: v as "available"|"sold"|"rented"})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Amenities (comma-separated)</Label>
              <Input value={form.amenities} onChange={e => setForm({...form, amenities: e.target.value})} placeholder="Pool, Gym, Parking, Balcony" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={loading}>{loading ? "Saving..." : editId ? "Update" : "Add"} Property</Button>
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
                <th className="text-left p-3 font-medium text-muted-foreground">Price</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Location</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No properties yet. Add your first property above.</td></tr>
              )}
              {properties.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{p.title}</td>
                  <td className="p-3 text-muted-foreground">{p.price}</td>
                  <td className="p-3 text-muted-foreground">{p.location}</td>
                  <td className="p-3"><Badge variant="outline">{p.type === "sale" ? "Sale" : "Rent"}</Badge></td>
                  <td className="p-3">{statusBadge(p.status)}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => toggleStatus(p)} title="Toggle status">
                        {p.status === "available" ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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

export default PropertiesManager;
