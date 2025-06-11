
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CustomerLayout } from "./components/customer/CustomerLayout";
import { AdminLayout } from "./components/admin/AdminLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CustomerDashboard from "./pages/customer/Dashboard";
import ConsultantDashboard from "./pages/consultant/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NewServiceRequest from "./pages/customer/NewServiceRequest";
import ServiceRequestDetail from "./pages/customer/ServiceRequestDetail";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRoles = [] }: { children: JSX.Element, requiredRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'consultant') {
      return <Navigate to="/consultant/dashboard" replace />;
    } else {
      return <Navigate to="/customer/dashboard" replace />;
    }
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer routes with sidebar layout */}
      <Route path="/customer/dashboard" element={
        <ProtectedRoute requiredRoles={['customer']}>
          <CustomerLayout>
            <CustomerDashboard />
          </CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/customer/new-request" element={
        <ProtectedRoute requiredRoles={['customer']}>
          <CustomerLayout>
            <NewServiceRequest />
          </CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/customer/request/:id" element={
        <ProtectedRoute requiredRoles={['customer']}>
          <CustomerLayout>
            <ServiceRequestDetail />
          </CustomerLayout>
        </ProtectedRoute>
      } />
      
      {/* Consultant routes */}
      <Route path="/consultant/dashboard" element={
        <ProtectedRoute requiredRoles={['consultant']}>
          <ConsultantDashboard />
        </ProtectedRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requiredRoles={['admin']}>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
