import { Navigate, useLocation } from 'react-router-dom';
import type { FC, ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';

/**
 * Route guard component. Redirects unauthenticated users to /login.
 * Preserves the intended destination via `returnTo` search param.
 *
 * Usage:
 *   <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
 */

interface ProtectedRouteProps {
    children: ReactNode;
    role?: 'admin' | 'user';
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, role }) => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ returnTo: location.pathname }}
                replace
            />
        );
    }

    if (role && user?.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};