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
            <Card>
                <CardHeader>
                    <CardTitle>Marketplace Trends</CardTitle>
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
        <Card>
            <CardHeader>
                <CardTitle>Marketplace Trends</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '12px',
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="activeDeals"
                            stroke="#4F46E5"
                            strokeWidth={2}
                            name="Active Deals"
                        />
                        <Line
                            type="monotone"
                            dataKey="newDeals"
                            stroke="#16A34A"
                            strokeWidth={2}
                            name="New Deals"
                        />
                        <Line
                            type="monotone"
                            dataKey="offersSubmitted"
                            stroke="#F59E0B"
                            strokeWidth={2}
                            name="Offers Submitted"
                        />
                        <Line
                            type="monotone"
                            dataKey="userViews"
                            stroke="#EF4444"
                            strokeWidth={2}
                            name="User Views"
                        />
                        <Line
                            type="monotone"
                            dataKey="averageDealValueUSD"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            name="Avg Deal Value ($)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
