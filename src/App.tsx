import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// User Imports
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Services from './pages/Services';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PwaInstallAlert from './components/custom/PwaInstallAlert';

// Auth Imports
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { Toaster } from 'sonner';

// Admin Imports
import RegisterEnterprise from './admin/pages/RegisterEnterprise';
import AdminDashboard from './admin/pages/Dashboard';
import AdminUsers from './admin/pages/Users';
import AdminContent from './admin/pages/Content';
import AdminLogin from './admin/pages/Login';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute'; // Import ProtectedRoute
import QueueDetail from './admin/pages/QueueDetail';
import CreateQueue from './admin/pages/CreateQueue';
import Notifications from './admin/pages/Notifications';
import AdminSettings from './admin/pages/Settings';
import AdminStats from './admin/pages/Stats';
import AdminQueues from './admin/pages/Queues';
import { TicketStatus } from './components/Ticket/TicketStatus';
import { useParams, useNavigate } from 'react-router-dom';

const TicketViewWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id) return <Navigate to="/services" />;
  return <TicketStatus ticketId={id} onBack={() => navigate('/services')} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <PwaInstallAlert />
      <Routes>
        {/* User Routes - Wrapped in Layout */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen bg-background text-foreground font-poppins">
            <Navbar />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="flex flex-col min-h-screen bg-background text-foreground font-poppins">
            <Navbar />
            <main className="flex-grow">
              <About />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/services" element={
          <div className="flex flex-col min-h-screen bg-background text-foreground font-poppins">
            <Navbar />
            <main className="flex-grow">
              <Services />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/profile" element={
          <div className="flex flex-col min-h-screen bg-background text-foreground font-poppins">
            <Navbar />
            <main className="flex-grow">
              <Profile />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/dashboard" element={
          <div className="flex flex-col min-h-screen bg-background text-foreground font-poppins">
            <Navbar />
            <main className="flex-grow">
              <UserDashboard />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/tickets/:id" element={
          <div className="flex flex-col min-h-screen bg-slate-50 font-poppins">
            <TicketViewWrapper />
          </div>
        } />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<RegisterEnterprise />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="create-queue" element={<CreateQueue />} />
            <Route path="queues/:id" element={<QueueDetail />} />
            <Route path="queues" element={<AdminQueues />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="content" element={<AdminContent />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
