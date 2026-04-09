import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, CheckCircle2, XCircle, Upload, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
  assignedStaff: string[];
  slug: string;
  category: string;
  createdAt: Timestamp;
}

type FormState = {
  title: string; price: string; location: string; beds: number; baths: number;
  area: string; type: "sale" | "rent"; status: "available" | "sold" | "rented";
  description: string; image: string; developer: string; amenities: string;
  assignedStaff: string[]; imageFile: File | null; category: string;
};

const emptyForm: FormState = {
  title: "", price: "", location: "", beds: 1, baths: 1,
  area: "", type: "sale", status: "available",
  description: "", image: "", developer: "", amenities: "",
  assignedStaff: [], imageFile: null, category: "",
};

const PropertiesManager = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [staff, setStaff] = useState<{id: string, name: string, role: string}[]>([]);

  const fetchProperties = async () => {
    const snap = await getDocs(collection(db, "properties"));
    setProperties(snap.docs.map(d => ({ id: d.id, ...d.data() } as Property)));
  };

  const fetchStaff = async () => {
    const snap = await getDocs(collection(db, "staff"));
    setStaff(snap.docs.map(d => ({ id: d.id, name: d.data().name, role: d.data().role })));
  };

  useEffect(() => { 
    fetchProperties(); 
    fetchStaff();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price.trim()) return;
    setLoading(true);
    try {
      let imageUrl = form.image;

      // Upload new image if file is selected
      if (form.imageFile) {
        setUploading(true);
        const fileName = `properties/${Date.now()}_${form.imageFile.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, form.imageFile);
        imageUrl = await getDownloadURL(storageRef);
        setUploading(false);
      }

      const data = {
        ...form,
        image: imageUrl,
        beds: Number(form.beds),
        baths: Number(form.baths),
        slug: generateSlug(form.title),
        updatedAt: Timestamp.now()
      };
      delete (data as any).imageFile; // Remove file from data

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
    } catch (error) {
      console.error("Error saving property:", error);
      toast({ title: "Error saving property", variant: "destructive" });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleEdit = (p: Property) => {
    setForm({
      title: p.title, price: p.price, location: p.location,
      beds: p.beds, baths: p.baths, area: p.area,
      type: p.type, status: p.status, description: p.description,
      image: p.image, developer: p.developer || "", amenities: p.amenities || "",
      assignedStaff: p.assignedStaff || [], imageFile: null, category: p.category || "",
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
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartments">Apartments</SelectItem>
                  <SelectItem value="Town House">Town House</SelectItem>
                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                  <SelectItem value="Villas">Villas</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Assigned Staff (Optional)</Label>
              <Select 
                value="" 
                onValueChange={(staffId) => {
                  if (!form.assignedStaff.includes(staffId)) {
                    setForm({...form, assignedStaff: [...form.assignedStaff, staffId]});
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select staff to assign" />
                </SelectTrigger>
                <SelectContent>
                  {staff.filter(s => !form.assignedStaff.includes(s.id)).map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} ({s.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.assignedStaff.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.assignedStaff.map(staffId => {
                    const staffMember = staff.find(s => s.id === staffId);
                    return staffMember ? (
                      <Badge key={staffId} variant="secondary" className="flex items-center gap-1">
                        {staffMember.name} ({staffMember.role})
                        <button
                          onClick={() => setForm({...form, assignedStaff: form.assignedStaff.filter(id => id !== staffId)})}
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
              <Label>Amenities (comma-separated)</Label>
              <Input value={form.amenities} onChange={e => setForm({...form, amenities: e.target.value})} placeholder="Pool, Gym, Parking, Balcony" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} />
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
                  "Update Property"
                ) : (
                  "Add Property"
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
