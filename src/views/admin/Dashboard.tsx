"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Home, MapPin, Users, Newspaper, Handshake } from "lucide-react";

const statCards = [
  { key: "properties", label: "Properties", icon: Home, color: "bg-blue-500" },
  { key: "communities", label: "Communities", icon: MapPin, color: "bg-emerald-500" },
  { key: "staff", label: "Sales Staff", icon: Users, color: "bg-violet-500" },
  { key: "news", label: "News Posts", icon: Newspaper, color: "bg-amber-500" },
  { key: "services", label: "Services", icon: Handshake, color: "bg-cyan-600" },
];

const AdminDashboard = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      const collections = ["properties", "communities", "staff", "news", "services"];
      const results: Record<string, number> = {};
      for (const col of collections) {
        try {
          const snap = await getCountFromServer(collection(db, col));
          results[col] = snap.data().count;
        } catch {
          results[col] = 0;
        }
      }
      setCounts(results);
    };
    fetchCounts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.key} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{counts[card.key] ?? "—"}</p>
            <p className="text-sm text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-2">Welcome to your CMS</h2>
        <p className="text-muted-foreground text-sm">
          Use the sidebar to manage properties, communities, sales staff, services, and news articles.
          All changes will be reflected on the public website in real-time.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
