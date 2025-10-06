'use client';

import { ApiResponse } from '@/types/marketplace';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryMetricsProps {
    data: ApiResponse[];
}

function Delta({ current, prev }: { current: number; prev?: number }) {
    if (prev === undefined || prev === 0) return null;
    const pct = ((current - prev) / prev) * 100;
    const sign = pct > 0 ? '+' : '';
    const tone = pct > 0 ? 'emerald' : pct < 0 ? 'rose' : '';
    const color = pct === 0 ? 'text-muted-foreground' : `text-${tone}-700`;
    const bg = pct === 0
        ? 'bg-muted'
        : `bg-${tone}-100 dark:bg-${tone}-900/20`;
    return (
        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${color} ${bg}`}>
            {sign}{pct.toFixed(1)}%
        </span>
    );
}

export const SummaryMetrics = ({ data }: SummaryMetricsProps) => {
    const latest: ApiResponse | undefined = data[0];
    if (!latest) return null;
    const previous: ApiResponse | undefined = data[1];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Card className="border-border/50 shadow-sm">
                <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Active Deals</div>
                    <div className="text-xl font-semibold text-foreground">
                        {latest.activeDeals}
                        <Delta current={latest.activeDeals} prev={previous?.activeDeals} />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 shadow-sm">
                <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">New Deals</div>
                    <div className="text-xl font-semibold text-foreground">
                        {latest.newDeals}
                        <Delta current={latest.newDeals} prev={previous?.newDeals} />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 shadow-sm">
                <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Avg Deal Value (USD)</div>
                    <div className="text-xl font-semibold text-foreground">
                        {latest.averageDealValueUSD.toLocaleString()}
                        <Delta current={latest.averageDealValueUSD} prev={previous?.averageDealValueUSD} />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 shadow-sm">
                <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Offers Submitted</div>
                    <div className="text-xl font-semibold text-foreground">
                        {latest.offersSubmitted}
                        <Delta current={latest.offersSubmitted} prev={previous?.offersSubmitted} />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-border/50 shadow-sm col-span-2 sm:col-span-3 md:col-span-1">
                <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">User Views</div>
                    <div className="text-xl font-semibold text-foreground">
                        {latest.userViews}
                        <Delta current={latest.userViews} prev={previous?.userViews} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
