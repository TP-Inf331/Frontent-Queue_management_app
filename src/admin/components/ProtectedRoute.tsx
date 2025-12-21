import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

const ProtectedRoute: React.FC = () => {
    const { user, isAuthenticated } = useAuthStore();

    // Check if user is authenticated and has admin or agent role
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (user && user.role !== 'admin' && user.role !== 'agent') {
        // User is authenticated but not admin/agent - redirect to user dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
