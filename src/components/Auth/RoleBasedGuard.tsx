import React from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { UserRole } from '@/interface/api.interface';

interface RoleBasedGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
    fallback?: React.ReactNode;
}

export const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({
    children,
    allowedRoles,
    fallback = null,
}) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
