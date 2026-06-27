import AdminLogin from "@/pages/admin/Login";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/admin/login");

export default function AdminLoginPage() {
  return <AdminLogin />;
}
