import { Navigate, useLocation } from 'react-router-dom';
import type { FC, ReactNode } from 'react';

/**
 * Route guard component. Redirects unauthenticated users to /login.
 * Preserves the intended destination via `returnTo` search param.
 *
 * Usage:
 *   <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
 *
 * TODO: Replace `isAuthenticated` + `userRole` with real authStore selectors
 *       once Supabase/JWT auth is implemented (Phase 2).
 */

interface ProtectedRouteProps {
    children: ReactNode;
    role?: 'admin' | 'customer';
}

// Temporary: hard-coded to false until real auth is wired up.
// This blocks ALL access so the vulnerability is closed immediately.
const isAuthenticated = false;
const userRole: string | null = null;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, role }) => {
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

    if (role && userRole !== role) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};