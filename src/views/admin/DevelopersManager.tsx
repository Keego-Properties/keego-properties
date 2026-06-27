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

interface Developer {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  highlights?: string[];
  createdAt: Timestamp;
}

type FormState = {
  name: string;
  description: string;
  logo: string;
  website: string;
  highlights: string;
  logoFile: File | null;
};

const emptyForm: FormState = {
  name: "",
  description: "",
  logo: "",
  website: "",
  highlights: "",
  logoFile: null,
};

const DevelopersManager = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchDevelopers = async () => {
    const snap = await getDocs(collection(db, "developers"));
    setDevelopers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Developer)));
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      let logoUrl = form.logo;
      if (form.logoFile) {
        setUploading(true);
        const fileName = `developers/${Date.now()}_${form.logoFile.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, form.logoFile);
        logoUrl = await getDownloadURL(storageRef);
        setUploading(false);
      }

      const data = {
        name: form.name,
        description: form.description,
        logo: logoUrl,
        website: form.website,
        highlights: form.highlights
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        updatedAt: Timestamp.now(),
      };

      if (editId) {
        await updateDoc(doc(db, "developers", editId), data);
        toast({ title: "Developer updated" });
      } else {
        await addDoc(collection(db, "developers"), { ...data, createdAt: Timestamp.now() });
        toast({ title: "Developer added" });
      }

      setForm(emptyForm);
      setShowForm(false);
      setEditId(null);
      fetchDevelopers();
    } catch (error) {
      console.error("Error saving developer:", error);
      toast({ title: "Error saving developer", variant: "destructive" });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleEdit = (dev: Developer) => {
    setForm({
      name: dev.name,
      description: dev.description || "",
      logo: dev.logo || "",
      website: dev.website || "",
      highlights: dev.highlights?.join(", ") || "",
      logoFile: null,
    });
    setEditId(dev.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this developer?")) return;
    await deleteDoc(doc(db, "developers", id));
    toast({ title: "Developer deleted" });
    fetchDevelopers();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">Developers</h1>
        <Button
          onClick={() => {
            setForm(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Developer
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{editId ? "Edit Developer" : "Add Developer"}</h2>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Emaar Properties"
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description of the developer"
                rows={3}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://example.com"
                type="url"
              />
            </div>
            <div>
              <Label>Developer Highlights (comma separated)</Label>
              <Input
                value={form.highlights}
                onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                placeholder="Trusted developer, Premium communities, Flexible payment plans"
              />
            </div>
            <div>
              <Label>Logo</Label>
              {form.logo && (
                <div className="mb-2">
                  <img src={form.logo} alt="Logo" className="h-12 object-contain rounded border border-border" />
                </div>
              )}
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                  <Upload className="w-4 h-4" />
                  {form.logoFile ? form.logoFile.name : "Upload logo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setForm({ ...form, logoFile: file });
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={loading || uploading}>
                {uploading ? "Uploading..." : loading ? "Saving..." : editId ? "Update" : "Add Developer"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {developers.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">No developers added yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Logo</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Description</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Website</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {developers.map((dev) => (
                <tr key={dev.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    {dev.logo ? (
                      <img src={dev.logo} alt={dev.name} className="h-10 w-10 object-contain rounded" />
                    ) : (
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{dev.name}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-xs truncate">{dev.description}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {dev.website ? (
                      <a href={dev.website} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs">
                        {dev.website}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(dev)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(dev.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DevelopersManager;
