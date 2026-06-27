"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  highlights: string;
  propertiesCount: number;
  avgPrice: string;
  propertyIds: string[];
  featured: boolean;
  createdAt: Timestamp;
}

type FormState = {
  name: string; description: string; image: string; location: string;
  highlights: string; propertiesCount: number; avgPrice: string; imageFile: File | null; propertyIds: string[];
  featured: boolean;
};

const emptyForm: FormState = {
  name: "", description: "", image: "", location: "",
  highlights: "", propertiesCount: 0, avgPrice: "", imageFile: null, propertyIds: [], featured: false,
};

const CommunitiesManager = () => {
  const [items, setItems] = useState<Community[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [allProperties, setAllProperties] = useState<{id: string, title: string, location: string}[]>([]);

  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "communities"));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Community)));
  };

  const fetchProperties = async () => {
    const snap = await getDocs(collection(db, "properties"));
    setAllProperties(snap.docs.map(d => ({ id: d.id, title: d.data().title, location: d.data().location })));
  };

  useEffect(() => { fetchItems(); fetchProperties(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      let imageUrl = form.image;

      if (form.imageFile) {
        setUploading(true);
        const fileName = `communities/${Date.now()}_${form.imageFile.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, form.imageFile);
        imageUrl = await getDownloadURL(storageRef);
        setUploading(false);
      }

      const data = {
        ...form,
        image: imageUrl,
        propertiesCount: Number(form.propertiesCount),
        updatedAt: Timestamp.now()
      };
      delete (data as any).imageFile;

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
    } catch (error) {
      console.error("Error saving:", error);
      toast({ title: "Error saving", variant: "destructive" });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleEdit = (c: Community) => {
    setForm({
      name: c.name, description: c.description, image: c.image,
      location: c.location || "", highlights: c.highlights || "",
      propertiesCount: c.propertiesCount || 0, avgPrice: c.avgPrice || "",
      imageFile: null, propertyIds: c.propertyIds || [], featured: c.featured || false,
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
              <Label>Image Upload</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setForm({...form, imageFile: file});
                  }}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {form.image && !form.imageFile && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <img src={form.image} alt="Current" className="w-16 h-16 object-cover rounded" />
                    <span className="text-sm text-muted-foreground">Current image</span>
                  </div>
                )}
                {form.imageFile && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <img src={URL.createObjectURL(form.imageFile)} alt="Preview" className="w-16 h-16 object-cover rounded" />
                    <span className="text-sm text-muted-foreground">New image selected</span>
                  </div>
                )}
              </div>
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
              <Label>Properties in this Community (Optional)</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:border-ring focus:outline-none"
                value=""
                onChange={e => {
                  const val = e.target.value;
                  if (val && !form.propertyIds.includes(val))
                    setForm({...form, propertyIds: [...form.propertyIds, val]});
                }}
              >
                <option value="">— Select a property to add —</option>
                {allProperties
                  .filter(p => !form.propertyIds.includes(p.id))
                  .map(p => (
                    <option key={p.id} value={p.id}>{p.title}{p.location ? ` · ${p.location}` : ""}</option>
                  ))}
              </select>
              {form.propertyIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.propertyIds.map(pid => {
                    const prop = allProperties.find(p => p.id === pid);
                    return prop ? (
                      <Badge key={pid} variant="secondary" className="flex items-center gap-1">
                        {prop.title}
                        <button
                          type="button"
                          onClick={() => setForm({...form, propertyIds: form.propertyIds.filter(id => id !== pid)})}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} />
            </div>
            <div className="flex items-center gap-3 md:col-span-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={e => setForm({...form, featured: e.target.checked})}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <Label htmlFor="featured" className="cursor-pointer">Featured on Homepage</Label>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={loading || uploading}>
                {uploading ? (
                  <>
                    <Upload className="w-4 h-4 mr-1 animate-spin" />
                    Uploading...
                  </>
                ) : loading ? (
                  "Saving..."
                ) : editId ? (
                  "Update Community"
                ) : (
                  "Add Community"
                )}
              </Button>
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
                <th className="text-left p-3 font-medium text-muted-foreground">Featured</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No communities yet.</td></tr>
              )}
              {items.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{c.name}</td>
                  <td className="p-3 text-muted-foreground">{c.location}</td>
                  <td className="p-3 text-muted-foreground">{c.propertiesCount}</td>
                  <td className="p-3 text-muted-foreground">{c.avgPrice}</td>
                  <td className="p-3">
                    {c.featured ? <Badge className="bg-amber-100 text-amber-700 border-amber-200">Featured</Badge> : <span className="text-muted-foreground text-xs">—</span>}
                  </td>
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
