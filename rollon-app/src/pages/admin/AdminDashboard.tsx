import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    PackageCheck,
    UserPlus,
    Search,
    Bell,
    ChevronRight,
    MoreHorizontal,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useProducts, useOrders, useCustomers } from '@/hooks';
import type { Order } from '@/types';
import { FadeIn } from '@/components/animations/FadeIn';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { aggregateAnalytics } from '@/lib/analytics';
import { formatPrice } from '@/lib/utils';

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-500/20 text-yellow-500',
        processing: 'bg-blue-500/20 text-blue-500',
        shipped: 'bg-purple-500/20 text-purple-500',
        delivered: 'bg-green-500/20 text-green-500',
        cancelled: 'bg-red-500/20 text-red-500',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-500';
};

export function AdminDashboard() {
    const { data: products = [] } = useProducts();
    const { data: orders = [] } = useOrders();
    const { data: customers = [] } = useCustomers();

    const analytics = useMemo(() => aggregateAnalytics(orders), [orders]);

    const stats = [
        {
            title: 'Total Sales',
            value: `৳${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`,
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Total Orders',
            value: orders.length.toString(),
            change: '+8.2%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Products',
            value: products.length.toString(),
            change: '+3',
            trend: 'up',
            icon: PackageCheck,
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Customers',
            value: customers.length.toString(),
            change: '+5',
            trend: 'up',
            icon: UserPlus,
            color: 'from-orange-500 to-amber-500',
        },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative hidden sm:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-10 w-64"
                                />
                            </div>

                            {/* Notifications */}
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </Button>

                            {/* Profile */}
                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-white font-medium text-sm">A</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <FadeIn key={stat.title} delay={index * 0.1}>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    {stat.title}
                                                </p>
                                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                                <div className="flex items-center gap-1 mt-2">
                                                    {stat.trend === 'up' ? (
                                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                                    )}
                                                    <span
                                                        className={`text-sm ${stat.trend === 'up'
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                            }`}
                                                    >
                                                        {stat.change}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        vs last month
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                                            >
                                                <stat.icon className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Main Grid: Revenue Trend & Best Sellers */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Revenue Trend Area Chart */}
                        <FadeIn delay={0.4} className="lg:col-span-2">
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg font-medium">Revenue Trend</CardTitle>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/admin/analytics">Detailed View</Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analytics.revenueChartData}>
                                                <defs>
                                                    <linearGradient id="colorRevenueDashboard" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                <XAxis
                                                    dataKey="date"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                    tickFormatter={(value) => `৳${value}`}
                                                />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#22c55e' }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="revenue"
                                                    stroke="#22c55e"
                                                    strokeWidth={3}
                                                    fillOpacity={1}
                                                    fill="url(#colorRevenueDashboard)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        {/* Best Sellers Mini List */}
                        <FadeIn delay={0.5}>
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5 h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium">Best Sellers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {analytics.bestSellers.slice(0, 5).map((product) => (
                                            <div key={product.id} className="flex items-center gap-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm truncate">{product.name}</p>
                                                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                                                </div>
                                                <p className="text-sm font-bold">{formatPrice(product.revenue)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>

                    {/* Recent Orders */}
                    <FadeIn delay={0.6}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Recent Orders</CardTitle>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link to="/admin/orders">
                                        View All
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="w-10"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.slice(0, 5).map((order: Order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">
                                                    {order.orderNumber}
                                                </TableCell>
                                                <TableCell>{order.customerName}</TableCell>
                                                <TableCell>
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    ৳{order.total.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="secondary"
                                                        className={getStatusColor(order.status)}
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </FadeIn>

                    {/* Quick Actions */}
                    <FadeIn delay={0.5}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10">
                                <CardContent className="p-6">
                                    <Package className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-semibold mb-1">Add New Product</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Add a new product to your store
                                    </p>
                                    <Button size="sm" asChild>
                                        <Link to="/admin/products">Add Product</Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10">
                                <CardContent className="p-6">
                                    <BarChart3 className="h-8 w-8 text-orange-500 mb-4" />
                                    <h3 className="font-semibold mb-1">View Analytics</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Check your store performance
                                    </p>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link to="/admin/analytics">View Reports</Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                                <CardContent className="p-6">
                                    <Users className="h-8 w-8 text-green-500 mb-4" />
                                    <h3 className="font-semibold mb-1">Manage Customers</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        View and manage customers
                                    </p>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link to="/admin/customers">View Customers</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </FadeIn>
                </div>
            </main>
        </div>
    );
}
