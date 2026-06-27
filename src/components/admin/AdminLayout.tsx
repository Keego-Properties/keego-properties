"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  Building2,
  Home,
  MapPin,
  Users,
  Newspaper,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  HardHat,
  Handshake,
  BriefcaseBusiness,
  Star,
  BookOpen,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { href: "/admin/properties", icon: Home, label: "Properties" },
  { href: "/admin/communities", icon: MapPin, label: "Communities" },
  { href: "/admin/staff", icon: Users, label: "Sales Staff" },
  { href: "/admin/news", icon: Newspaper, label: "News" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog" },
  { href: "/admin/developers", icon: HardHat, label: "Developers" },
  { href: "/admin/services", icon: Handshake, label: "Services" },
  { href: "/admin/careers", icon: BriefcaseBusiness, label: "Careers" },
  { href: "/admin/reviews", icon: Star, label: "Reviews" },
  { href: "/admin/submissions", icon: Inbox, label: "Submissions" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const isNavActive = (href: string, end?: boolean) => {
    const currentPath = pathname ?? "";
    if (end) {
      return currentPath === href;
    }
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-foreground">Admin CMS</span>
          </div>
          <button
            className="lg:hidden text-muted-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isNavActive(item.href, item.end)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate mb-2">
            {user?.email}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <span className="font-serif font-bold text-foreground">Admin CMS</span>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
