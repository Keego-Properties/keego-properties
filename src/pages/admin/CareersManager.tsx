import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  status: "open" | "closed";
  featured: boolean;
  createdAt: Timestamp;
}

type FormState = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  status: "open" | "closed";
  featured: boolean;
};

const emptyForm: FormState = {
  title: "",
  department: "",
  location: "Dubai, UAE",
  type: "Full-time",
  description: "",
  requirements: "",
  status: "open",
  featured: false,
};

const CareersManager = () => {
  const [items, setItems] = useState<JobOpening[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "careers"));
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as JobOpening)));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      const data = { ...form, updatedAt: Timestamp.now() };
      if (editId) {
        await updateDoc(doc(db, "careers", editId), data);
        toast({ title: "Job updated" });
      } else {
        await addDoc(collection(db, "careers"), { ...data, createdAt: Timestamp.now() });
        toast({ title: "Job added" });
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
    }
  };

  const handleEdit = (job: JobOpening) => {
    setForm({
      title: job.title,
      department: job.department || "",
      location: job.location || "Dubai, UAE",
      type: job.type || "Full-time",
      description: job.description || "",
      requirements: job.requirements || "",
      status: job.status || "open",
      featured: job.featured || false,
    });
    setEditId(job.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    await deleteDoc(doc(db, "careers", id));
    toast({ title: "Job deleted" });
    fetchItems();
  };

  const toggleStatus = async (job: JobOpening) => {
    const next = job.status === "open" ? "closed" : "open";
    await updateDoc(doc(db, "careers", job.id), { status: next, updatedAt: Timestamp.now() });
    toast({ title: `Job marked as ${next}` });
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">Careers</h1>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Add Job
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{editId ? "Edit" : "Add"} Job Opening</h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="e.g. Sales, Marketing" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Employment Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as "open" | "closed" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Checkbox
                id="featured"
                checked={form.featured}
                onCheckedChange={(v) => setForm({ ...form, featured: !!v })}
              />
              <Label htmlFor="featured">Featured listing</Label>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Job Description *</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
                placeholder="Describe the role, responsibilities..."
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Requirements</Label>
              <Textarea
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                rows={4}
                placeholder="List qualifications, skills, experience..."
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editId ? "Update Job" : "Add Job"}
              </Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditId(null); }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No job openings yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((job) => (
              <div key={job.id} className="flex items-start justify-between gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{job.title}</span>
                    <Badge
                      variant="outline"
                      className={job.status === "open" ? "text-green-600 border-green-300" : "text-muted-foreground"}
                    >
                      {job.status}
                    </Badge>
                    {job.featured && (
                      <Badge className="bg-gold/10 text-gold border-gold/30 text-xs">Featured</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.department && `${job.department} · `}{job.location} · {job.type}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => toggleStatus(job)}>
                    {job.status === "open" ? "Close" : "Reopen"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(job)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(job.id)}>
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

export default CareersManager;
