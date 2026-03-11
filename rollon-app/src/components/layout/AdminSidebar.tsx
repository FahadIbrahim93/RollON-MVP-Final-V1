import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Customers', icon: Users, href: '/admin/customers' },
    { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

interface NavContentProps {
    onClose?: () => void;
}

const NavContent = ({ onClose }: NavContentProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        onClose?.();
        navigate('/login');
    };

    return (
        <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl border-r border-white/5 lg:border-none">
            {/* Logo */}
            <div className="p-6 border-b border-white/5">
                <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <span className="text-black font-black text-sm">R</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">RollON <span className="text-primary italic">Admin</span></span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {sidebarLinks.map((link) => {
                    const isActive = location.pathname === link.href || (link.href !== '/admin' && location.pathname.startsWith(link.href));
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <link.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5 mt-auto">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    );
};

export function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col fixed h-full z-40">
                <NavContent />
            </aside>

            {/* Mobile Header / Trigger */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 flex items-center justify-between z-30">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        <span className="text-black font-black text-sm">R</span>
                    </div>
                    <span className="font-bold text-white">RollON Admin</span>
                </Link>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 border-none">
                        <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                        <NavContent onClose={() => setIsOpen(false)} />
                    </SheetContent>
                </Sheet>
            </header>
        </>
    );
}
