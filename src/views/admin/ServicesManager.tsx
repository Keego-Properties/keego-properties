"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Trash2,
  X,
  Plus,
  Pencil,
} from "lucide-react";
import {
  FaArrowTrendUp,
  FaBuilding,
  FaCalculator,
  FaChartLine,
  FaGem,
  FaHouse,
  FaLandmark,
  FaListUl,
} from "react-icons/fa6";
import { db, storage } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const iconMap = {
  "fa-chart-line": FaChartLine,
  "fa-house": FaHouse,
  "fa-arrow-trend-up": FaArrowTrendUp,
  "fa-building": FaBuilding,
  "fa-gem": FaGem,
  "fa-calculator": FaCalculator,
  "fa-landmark": FaLandmark,
  "fa-list": FaListUl,
};

type IconName = keyof typeof iconMap;

const iconOptions: IconName[] = [
  "fa-chart-line",
  "fa-house",
  "fa-arrow-trend-up",
  "fa-building",
  "fa-gem",
  "fa-calculator",
  "fa-landmark",
  "fa-list",
];

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  image?: string;
  status: "published" | "draft";
  displayOrder: number;
  createdAt?: Timestamp;
}

type FormState = {
  title: string;
  description: string;
  icon: IconName;
  image: string;
  imageFile: File | null;
  status: "published" | "draft";
  displayOrder: string;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  icon: "fa-house",
  image: "",
  imageFile: null,
  status: "draft",
  displayOrder: "0",
};

const ServicesManager = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sortedServices = useMemo(
    () =>
      [...services].sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
        return a.title.localeCompare(b.title);
      }),
    [services],
  );

  const fetchServices = async () => {
    try {
      const snap = await getDocs(collection(db, "services"));
      setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceItem)));
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Cannot access services",
        description: "You do not have permission to read the services collection.",
        variant: "destructive",
      });
      setServices([]);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    setLoading(true);
    try {
      let imageUrl = form.image.trim();

      if (form.imageFile) {
        const fileName = `services/${Date.now()}_${form.imageFile.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, form.imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        icon: form.icon,
        image: imageUrl,
        status: form.status,
        displayOrder: Number(form.displayOrder) || 0,
        updatedAt: Timestamp.now(),
      };

      if (editId) {
        await updateDoc(doc(db, "services", editId), payload);
        toast({ title: "Service updated" });
      } else {
        await addDoc(collection(db, "services"), { ...payload, createdAt: Timestamp.now() });
        toast({ title: "Service added" });
      }

      setForm(emptyForm);
      setShowForm(false);
      setEditId(null);
      await fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Error saving service",
        description: "Check Firestore rules for create/update access to services.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: ServiceItem) => {
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon || "fa-house",
      image: service.image || "",
      imageFile: null,
      status: service.status || "draft",
      displayOrder: String(service.displayOrder ?? 0),
    });
    setEditId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteDoc(doc(db, "services", id));
      toast({ title: "Service deleted" });
      await fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error deleting service",
        description: "Check Firestore rules for delete access to services.",
        variant: "destructive",
      });
    }
  };

  const togglePublish = async (service: ServiceItem) => {
    const nextStatus = service.status === "published" ? "draft" : "published";
    try {
      await updateDoc(doc(db, "services", service.id), {
        status: nextStatus,
        updatedAt: Timestamp.now(),
      });
      toast({ title: `Service ${nextStatus}` });
      await fetchServices();
    } catch (error) {
      console.error("Error updating service status:", error);
      toast({
        title: "Error updating status",
        description: "Check Firestore rules for update access to services.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-foreground">Services</h1>
        <Button
          onClick={() => {
            setForm(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">{editId ? "Edit Service" : "Add Service"}</h2>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Property Sales"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={form.icon} onValueChange={(value) => setForm({ ...form, icon: value as IconName })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((iconName) => {
                    const Icon = iconMap[iconName];
                    return (
                    <SelectItem key={iconName} value={iconName}>
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {iconName}
                      </span>
                    </SelectItem>
                  );})}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value as "published" | "draft" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Description *</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                placeholder="Brief service description"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Service Image URL</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Or Upload Service Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })}
                className="file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
              />
              {(form.imageFile || form.image) && (
                <div className="rounded-lg border border-border bg-muted/20 p-2 w-fit">
                  <img
                    src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.image}
                    alt="Service preview"
                    className="h-20 w-32 rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editId ? "Update Service" : "Add Service"}
              </Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {sortedServices.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">No services added yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Image</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Icon</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedServices.map((service) => {
                  const Icon = iconMap[service.icon] || FaHouse;
                  return (
                    <tr key={service.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground">{service.displayOrder ?? 0}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{service.title}</p>
                        <p className="mt-1 max-w-md truncate text-xs text-muted-foreground">{service.description}</p>
                      </td>
                      <td className="px-4 py-3">
                        {service.image ? (
                          <img src={service.image} alt={service.title} className="h-10 w-16 rounded object-cover" />
                        ) : (
                          <span className="text-xs text-muted-foreground">No image</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-foreground">
                          <Icon className="h-3.5 w-3.5" />
                          {service.icon}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={service.status === "published" ? "default" : "secondary"}
                          className={service.status === "published" ? "bg-emerald-500 text-white" : ""}
                        >
                          {service.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => togglePublish(service)}>
                            {service.status === "published" ? "Unpublish" : "Publish"}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManager;
