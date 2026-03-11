import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    Calendar,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders, useProducts } from '@/hooks';
import { aggregateAnalytics } from '@/lib/analytics';
import { formatPrice } from '@/lib/utils';
import { FadeIn } from '@/components/animations/FadeIn';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

const COLORS = ['#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'];

export function AdminAnalytics() {
    const { data: orders = [] } = useOrders();
    const { data: products = [] } = useProducts();

    const analytics = useMemo(() => aggregateAnalytics(orders), [orders]);

    // Calculate Category Sales Data
    const categoryData = useMemo(() => {
        const catSales: Record<string, number> = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                const product = products.find(p => p.id === item.productId || p.name === item.name);
                const category = product?.category || 'Unknown';
                catSales[category] = (catSales[category] || 0) + (item.price * item.quantity);
            });
        });
        return Object.entries(catSales).map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [orders, products]);

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            <AdminSidebar />

            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
                <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/admin">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-xl font-semibold">Analytics & Insights</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="hidden sm:flex">
                                <Calendar className="h-4 w-4 mr-2" />
                                Last 7 Days
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="p-6 space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FadeIn delay={0.1}>
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Revenue</p>
                                            <h3 className="text-2xl font-bold mt-1">
                                                {formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}
                                            </h3>
                                        </div>
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <DollarSign className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-xs text-green-500">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        <span>+12.5% from last month</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Average Order</p>
                                            <h3 className="text-2xl font-bold mt-1">
                                                {formatPrice(orders.length > 0 ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0)}
                                            </h3>
                                        </div>
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <ShoppingBag className="h-5 w-5 text-blue-500" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-xs text-green-500">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        <span>+3.2% from last month</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Customers</p>
                                            <h3 className="text-2xl font-bold mt-1">
                                                {new Set(orders.map(o => o.customerId)).size}
                                            </h3>
                                        </div>
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                            <Users className="h-5 w-5 text-purple-500" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-xs text-green-500">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        <span>+5 new this week</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Conversion Rate</p>
                                            <h3 className="text-2xl font-bold mt-1">3.4%</h3>
                                        </div>
                                        <div className="p-2 bg-orange-500/10 rounded-lg">
                                            <TrendingUp className="h-5 w-5 text-orange-500" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-xs text-red-500">
                                        <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                                        <span>-0.5% from last month</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>

                    {/* Charts Row 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FadeIn delay={0.5} className="h-full">
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5 h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium">Revenue Trend</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analytics.revenueChartData}>
                                                <defs>
                                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
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
                                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                                    itemStyle={{ color: '#f97316' }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="revenue"
                                                    stroke="#f97316"
                                                    strokeWidth={3}
                                                    fillOpacity={1}
                                                    fill="url(#colorRevenue)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.6} className="h-full">
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5 h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium">Sales by Category</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={categoryData} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                                <XAxis type="number" hide />
                                                <YAxis
                                                    dataKey="name"
                                                    type="category"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                    width={100}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: '#ffffff05' }}
                                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                                />
                                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                                    {categoryData.map((_entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>

                    {/* Charts Row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Best Sellers */}
                        <FadeIn delay={0.7} className="lg:col-span-2">
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5 h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium">Best Selling Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {analytics.bestSellers.map((product, index) => (
                                            <div key={product.id} className="flex items-center gap-4 group">
                                                <div className="relative">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-black">
                                                        {index + 1}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium group-hover:text-primary transition-colors">{product.name}</h4>
                                                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">{formatPrice(product.revenue)}</p>
                                                    <div className="w-24 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary"
                                                            style={{ width: `${(product.revenue / analytics.bestSellers[0].revenue) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        {/* Segmentation */}
                        <FadeIn delay={0.8}>
                            <Card className="bg-card/50 backdrop-blur-xl border-white/5 h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium">Customer Segmentation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[200px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={analytics.segmentationData}
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {analytics.segmentationData.map((_entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {analytics.segmentationData.map((entry, index) => (
                                            <div key={entry.name} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                                    <span className="text-muted-foreground">{entry.name}</span>
                                                </div>
                                                <span className="font-medium">{entry.value} customers</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>
                </div>
            </main>
        </div>
    );
}
