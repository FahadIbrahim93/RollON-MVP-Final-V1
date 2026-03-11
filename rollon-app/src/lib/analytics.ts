import type { Order, OrderItem } from '@/types';

export interface RevenueData {
  date: string;
  revenue: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface ProductMetric {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: number;
}

export function aggregateAnalytics(orders: Order[]) {
  // Aggregate Revenue by Date (last 7 days)
  const revenueByDate: Record<string, number> = {};
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  last7Days.forEach(date => {
    revenueByDate[date] = 0;
  });

  orders.forEach(order => {
    const date = order.createdAt.split('T')[0];
    if (revenueByDate[date] !== undefined) {
      revenueByDate[date] += order.total;
    }
  });

  const revenueChartData: RevenueData[] = last7Days.map(date => ({
    date: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    revenue: revenueByDate[date],
  }));

  // Aggregate Sales by Category
  const productMetrics: Record<string, ProductMetric> = {};

  orders.forEach(order => {
    order.items.forEach((item: OrderItem) => {
      // Best selling products
      const productId = item.productId || item.name;
      if (!productMetrics[productId]) {
        productMetrics[productId] = {
          id: productId,
          name: item.name,
          image: item.image,
          sales: 0,
          revenue: 0,
        };
      }
      productMetrics[productId].sales += item.quantity;
      productMetrics[productId].revenue += item.price * item.quantity;

      // We don't have category info in OrderItem directly based on types
      // but we can infer or it might be needed to join with products
    });
  });

  const bestSellers = Object.values(productMetrics)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // Customer Segmentation (Simplified: One-time vs Repeat)
  const customerOrderCount: Record<string, number> = {};
  orders.forEach(order => {
    customerOrderCount[order.customerId] = (customerOrderCount[order.customerId] || 0) + 1;
  });

  const repeatCustomers = Object.values(customerOrderCount).filter(count => count > 1).length;
  const oneTimeCustomers = Object.values(customerOrderCount).filter(count => count === 1).length;

  const segmentationData = [
    { name: 'Repeat', value: repeatCustomers },
    { name: 'One-time', value: oneTimeCustomers },
  ];

  return {
    revenueChartData,
    bestSellers,
    segmentationData,
  };
}
