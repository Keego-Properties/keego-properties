import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  photo: string;
  bio: string;
  languages: string;
  status: "active" | "inactive";
  assignedProperties: string[];
  createdAt: Timestamp;
}

type FormState = {
  name: string; email: string; phone: string; role: string;
  photo: string; bio: string; languages: string; status: "active" | "inactive"; 
  assignedProperties: string[]; photoFile: File | null;
};

const emptyForm: FormState = {
  name: "", email: "", phone: "", role: "Agent",
  photo: "", bio: "", languages: "", status: "active", 
  assignedProperties: [], photoFile: null,
};

const SalesStaffManager = () => {
  const [items, setItems] = useState<Staff[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [properties, setProperties] = useState<{id: string, title: string, location: string}[]>([]);

  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "staff"));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Staff)));
  };

  const fetchProperties = async () => {
    const snap = await getDocs(collection(db, "properties"));
    setProperties(snap.docs.map(d => ({ id: d.id, title: d.data().title, location: d.data().location })));
  };

  useEffect(() => { 
    fetchItems(); 
    fetchProperties();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      let photoUrl = form.photo;

      if (form.photoFile) {
        setUploading(true);
        const fileName = `staff/${Date.now()}_${form.photoFile.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, form.photoFile);
        photoUrl = await getDownloadURL(storageRef);
        setUploading(false);
      }

      const data = {
        ...form,
        photo: photoUrl,
        updatedAt: Timestamp.now()
      };
      delete (data as any).photoFile;

      if (editId) {
        await updateDoc(doc(db, "staff", editId), data);
        toast({ title: "Staff updated" });
      } else {
        await addDoc(collection(db, "staff"), { ...data, createdAt: Timestamp.now() });
        toast({ title: "Staff added" });
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

  const handleEdit = (s: Staff) => {
    setForm({
      name: s.name, email: s.email, phone: s.phone,
      role: s.role, photo: s.photo || "", bio: s.bio || "",
      languages: s.languages || "", status: s.status || "active", 
      assignedProperties: s.assignedProperties || [], photoFile: null,
    });
    setEditId(s.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this staff member?")) return;
    await deleteDoc(doc(db, "staff", id));
    toast({ title: "Staff deleted" });
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">Sales Staff</h1>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Add Staff
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{editId ? "Edit" : "Add"} Staff Member</h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+971 50 123 4567" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={v => setForm({...form, role: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Senior Agent">Senior Agent</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Director">Director</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Photo Upload</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setForm({...form, photoFile: file});
                  }}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {form.photo && !form.photoFile && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <img src={form.photo} alt="Current" className="w-16 h-16 object-cover rounded-full" />
                    <span className="text-sm text-muted-foreground">Current photo</span>
                  </div>
                )}
                {form.photoFile && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <img src={URL.createObjectURL(form.photoFile)} alt="Preview" className="w-16 h-16 object-cover rounded-full" />
                    <span className="text-sm text-muted-foreground">New photo selected</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Languages (comma-separated)</Label>
              <Input value={form.languages} onChange={e => setForm({...form, languages: e.target.value})} placeholder="English, Arabic, Hindi" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({...form, status: v as "active"|"inactive"})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Assigned Properties (Optional)</Label>
              <Select 
                value="" 
                onValueChange={(propertyId) => {
                  if (!form.assignedProperties.includes(propertyId)) {
                    setForm({...form, assignedProperties: [...form.assignedProperties, propertyId]});
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select properties to assign" />
                </SelectTrigger>
                <SelectContent>
                  {properties.filter(p => !form.assignedProperties.includes(p.id)).map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title} - {p.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.assignedProperties.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.assignedProperties.map(propertyId => {
                    const property = properties.find(p => p.id === propertyId);
                    return property ? (
                      <Badge key={propertyId} variant="secondary" className="flex items-center gap-1">
                        {property.title}
                        <button
                          onClick={() => setForm({...form, assignedProperties: form.assignedProperties.filter(id => id !== propertyId)})}
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
              <Label>Bio</Label>
              <Textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} />
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
                  "Update Staff"
                ) : (
                  "Add Staff"
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
                <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Phone</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No staff members yet.</td></tr>
              )}
              {items.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3 text-muted-foreground">{s.email}</td>
                  <td className="p-3 text-muted-foreground">{s.phone}</td>
                  <td className="p-3"><Badge variant="outline">{s.role}</Badge></td>
                  <td className="p-3">
                    <Badge className={s.status === "active" ? "bg-emerald-500 text-white" : ""}
                      variant={s.status === "active" ? "default" : "secondary"}>
                      {s.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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

export default SalesStaffManager;
