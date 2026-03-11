import type { Order } from '@/types';

export interface MonthlyMetric {
  month: string;
  revenue: number;
  orders: number;
}

export interface CustomerSegment {
  name: string;
  value: number;
  color: string;
}

export interface BestSellerMetric {
  name: string;
  units: number;
  revenue: number;
}

export interface AnalyticsSnapshot {
  monthlyRevenue: MonthlyMetric[];
  segmentedCustomers: CustomerSegment[];
  bestSellers: BestSellerMetric[];
}

const defaultSegments = [
  { label: 'VIP (৳20k+)', min: 20000, color: '#f97316' },
  { label: 'Loyal (৳8k-20k)', min: 8000, color: '#22d3ee' },
  { label: 'Growing (৳2k-8k)', min: 2000, color: '#a855f7' },
  { label: 'New (<৳2k)', min: 0, color: '#10b981' },
];

export function buildAdminAnalytics(orders: Order[], monthsToShow = 6): AnalyticsSnapshot {
  const now = new Date();
  const monthlyMap = new Map<string, { revenue: number; orders: number }>();

  Array.from({ length: monthsToShow }).forEach((_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (monthsToShow - 1 - index), 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyMap.set(key, { revenue: 0, orders: 0 });
  });

  const customerSpendMap = new Map<string, number>();
  const itemSalesMap = new Map<string, { units: number; revenue: number }>();

  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    const monthKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
    const monthEntry = monthlyMap.get(monthKey);

    if (monthEntry) {
      monthEntry.revenue += order.total;
      monthEntry.orders += 1;
    }

    customerSpendMap.set(order.customerId, (customerSpendMap.get(order.customerId) ?? 0) + order.total);

    order.items.forEach((item) => {
      const itemEntry = itemSalesMap.get(item.name) || { units: 0, revenue: 0 };
      itemSalesMap.set(item.name, {
        units: itemEntry.units + item.quantity,
        revenue: itemEntry.revenue + item.quantity * item.price,
      });
    });
  });

  const monthlyRevenue = Array.from(monthlyMap.entries()).map(([key, value]) => {
    const [year, month] = key.split('-').map(Number);
    const date = new Date(year, month - 1, 1);

    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      revenue: value.revenue,
      orders: value.orders,
    };
  });

  const segmentSpend = Array.from(customerSpendMap.values());
  const segmentedCustomers = defaultSegments.map((segment, index) => {
    const upperBound = defaultSegments[index - 1]?.min ?? Number.POSITIVE_INFINITY;
    const count = segmentSpend.filter((total) => total >= segment.min && total < upperBound).length;

    return {
      name: segment.label,
      value: count,
      color: segment.color,
    };
  });

  const bestSellers = Array.from(itemSalesMap.entries())
    .map(([name, value]) => ({ name, ...value }))
    .sort((a, b) => (b.units === a.units ? b.revenue - a.revenue : b.units - a.units))
    .slice(0, 5);

  return { monthlyRevenue, segmentedCustomers, bestSellers };
}
