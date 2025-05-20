
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CustomerDashboard from "./pages/customer/Dashboard";
import ConsultantDashboard from "./pages/consultant/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

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

      {/* Customer routes */}
      <Route path="/customer/dashboard" element={
        <ProtectedRoute requiredRoles={['customer']}>
          <CustomerDashboard />
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
          <AdminDashboard />
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
          <MainLayout>
            <AppRoutes />
          </MainLayout>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
