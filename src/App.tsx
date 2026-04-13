import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import Properties from "./pages/Properties.tsx";
import Communities from "./pages/Communities.tsx";
import CommunityDetail from "./pages/CommunityDetail.tsx";
import PropertyDetail from "./pages/PropertyDetail.tsx";
import News from "./pages/News.tsx";
import NewsDetail from "./pages/NewsDetail.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import ListProperty from "./pages/ListProperty.tsx";
import PropertyValuation from "./pages/PropertyValuation.tsx";
import YourVoiceMatters from "./pages/YourVoiceMatters.tsx";
import Developers from "./pages/Developers.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/admin/Login.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import PropertiesManager from "./pages/admin/PropertiesManager.tsx";
import CommunitiesManager from "./pages/admin/CommunitiesManager.tsx";
import SalesStaffManager from "./pages/admin/SalesStaffManager.tsx";
import NewsManager from "./pages/admin/NewsManager.tsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/list-property" element={<ListProperty />} />
            <Route path="/property-valuation" element={<PropertyValuation />} />
            <Route path="/your-voice-matters" element={<YourVoiceMatters />} />
            <Route path="/developers" element={<Developers />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="properties" element={<PropertiesManager />} />
              <Route path="communities" element={<CommunitiesManager />} />
              <Route path="staff" element={<SalesStaffManager />} />
              <Route path="news" element={<NewsManager />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
