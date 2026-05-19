import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Phone, Mail, MessageSquare, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SubmissionSource = "contact_form" | "callback_popup" | "property_enquiry" | string;

interface Submission {
  id: string;
  source: SubmissionSource;
  // contact_form / property_enquiry fields
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  lookingTo?: string;
  category?: string;
  subCategory?: string;
  budget?: string;
  propertyName?: string;
  createdAt?: Timestamp;
}

const SOURCE_LABELS: Record<string, string> = {
  contact_form: "Contact Form",
  callback_popup: "Callback Request",
  property_enquiry: "Property Enquiry",
  property_detail: "Property Enquiry",
  list_property: "List Property",
  holiday_homes: "Holiday Homes",
};

const SOURCE_COLORS: Record<string, string> = {
  contact_form: "bg-blue-100 text-blue-800 border-blue-200",
  callback_popup: "bg-amber-100 text-amber-800 border-amber-200",
  property_enquiry: "bg-green-100 text-green-800 border-green-200",
  property_detail: "bg-green-100 text-green-800 border-green-200",
  list_property: "bg-purple-100 text-purple-800 border-purple-200",
  holiday_homes: "bg-teal-100 text-teal-800 border-teal-200",
};

const getDisplayName = (s: Submission) => {
  if (s.name) return s.name;
  const full = [s.firstName, s.lastName].filter(Boolean).join(" ");
  return full || "—";
};

const formatDate = (ts?: Timestamp) => {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SubmissionsManager = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      // Fetch from "submissions" collection (contact forms + callbacks)
      const submissionsSnap = await getDocs(
        query(collection(db, "submissions"), orderBy("createdAt", "desc"))
      );
      const submissionsData: Submission[] = submissionsSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Submission, "id">),
      }));

      // Fetch from "enquiries" collection (property enquiries)
      const enquiriesSnap = await getDocs(
        query(collection(db, "enquiries"), orderBy("createdAt", "desc"))
      );
      const enquiriesData: Submission[] = enquiriesSnap.docs.map((d) => ({
        id: `enq_${d.id}`,
        ...(d.data() as Omit<Submission, "id">),
        source: (d.data().source as string) || "property_enquiry",
      }));

      const combined = [...submissionsData, ...enquiriesData].sort((a, b) => {
        const ta = a.createdAt?.toMillis() ?? 0;
        const tb = b.createdAt?.toMillis() ?? 0;
        return tb - ta;
      });

      setSubmissions(combined);
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
      toast({ title: "Failed to load submissions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (submission: Submission) => {
    const confirmed = window.confirm("Delete this submission permanently?");
    if (!confirmed) return;

    setDeletingId(submission.id);
    try {
      const isEnquiry = submission.id.startsWith("enq_");
      const realId = isEnquiry ? submission.id.replace("enq_", "") : submission.id;
      const collectionName = isEnquiry ? "enquiries" : "submissions";
      await deleteDoc(doc(db, collectionName, realId));
      setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
      toast({ title: "Submission deleted" });
    } catch (err) {
      console.error("Delete failed:", err);
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  const sources = ["all", ...Array.from(new Set(submissions.map((s) => s.source)))];
  const filtered =
    filter === "all" ? submissions : submissions.filter((s) => s.source === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Form Submissions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All enquiries and messages submitted across the website
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAll}
          disabled={loading}
          className="self-start sm:self-auto gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sources.map((src) => (
          <button
            key={src}
            onClick={() => setFilter(src)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === src
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-border hover:bg-muted/70"
            }`}
          >
            {src === "all" ? "All" : (SOURCE_LABELS[src] ?? src)}
            {src === "all" && (
              <span className="ml-1.5 opacity-70">({submissions.length})</span>
            )}
            {src !== "all" && (
              <span className="ml-1.5 opacity-70">
                ({submissions.filter((s) => s.source === src).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          Loading submissions…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          No submissions found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((sub) => {
            const isExpanded = expandedId === sub.id;
            return (
              <div
                key={sub.id}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
              >
                {/* Row header */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                          SOURCE_COLORS[sub.source] ?? "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {SOURCE_LABELS[sub.source] ?? sub.source}
                      </span>
                      {sub.propertyName && (
                        <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {sub.propertyName}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {getDisplayName(sub)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(sub.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {sub.phone && (
                      <a
                        href={`tel:${sub.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title={sub.phone}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    {sub.email && (
                      <a
                        href={`mailto:${sub.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title={sub.email}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(sub);
                      }}
                      disabled={deletingId === sub.id}
                      className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-border bg-muted/20">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      {sub.email && (
                        <div>
                          <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Email</dt>
                          <dd>
                            <a href={`mailto:${sub.email}`} className="text-primary hover:underline">
                              {sub.email}
                            </a>
                          </dd>
                        </div>
                      )}
                      {sub.phone && (
                        <div>
                          <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Phone</dt>
                          <dd>
                            <a href={`tel:${sub.phone}`} className="hover:underline">
                              {sub.phone}
                            </a>
                          </dd>
                        </div>
                      )}
                      {sub.lookingTo && (
                        <div>
                          <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Looking To</dt>
                          <dd className="capitalize">{sub.lookingTo}</dd>
                        </div>
                      )}
                      {sub.category && (
                        <div>
                          <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Category</dt>
                          <dd>{sub.category}</dd>
                        </div>
                      )}
                      {sub.subCategory && (
                        <div>
                          <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Sub-Category</dt>
                          <dd>{sub.subCategory}</dd>
                        </div>
                      )}
                      {sub.budget && (
                        <div>
                          <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Budget</dt>
                          <dd>AED {sub.budget}</dd>
                        </div>
                      )}
                      {sub.propertyName && (
                        <div className="sm:col-span-2">
                          <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Property</dt>
                          <dd>{sub.propertyName}</dd>
                        </div>
                      )}
                      {sub.message && (
                        <div className="sm:col-span-2">
                          <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Message</dt>
                          <dd className="text-muted-foreground whitespace-pre-wrap">{sub.message}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubmissionsManager;
