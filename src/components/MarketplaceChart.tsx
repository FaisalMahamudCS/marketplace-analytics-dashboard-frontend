'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { ChartDataPoint } from '@/types/marketplace';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MarketplaceChartProps {
    data: ChartDataPoint[];
    loading?: boolean;
}

export const MarketplaceChart = ({ data, loading }: MarketplaceChartProps) => {
    if (loading) {
        return (
            <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-foreground">Marketplace Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foreground">Marketplace Trends</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--card)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                fontSize: '12px',
                                color: 'var(--foreground)',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="activeDeals"
                            stroke="var(--chart-1)"
                            strokeWidth={2.5}
                            name="Active Deals"
                            dot={{ fill: 'var(--chart-1)', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="newDeals"
                            stroke="var(--chart-2)"
                            strokeWidth={2.5}
                            name="New Deals"
                            dot={{ fill: 'var(--chart-2)', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="offersSubmitted"
                            stroke="var(--chart-3)"
                            strokeWidth={2.5}
                            name="Offers Submitted"
                            dot={{ fill: 'var(--chart-3)', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="userViews"
                            stroke="var(--chart-4)"
                            strokeWidth={2.5}
                            name="User Views"
                            dot={{ fill: 'var(--chart-4)', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="averageDealValueUSD"
                            stroke="var(--chart-5)"
                            strokeWidth={2.5}
                            name="Avg Deal Value ($)"
                            dot={{ fill: 'var(--chart-5)', strokeWidth: 2, r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
