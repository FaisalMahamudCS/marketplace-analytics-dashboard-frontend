'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StatusIndicatorProps {
    isConnected: boolean;
    lastUpdated: Date | null;
    onRefresh: () => void;
    loading: boolean;
}

export const StatusIndicator = ({
    isConnected,
    lastUpdated,
    onRefresh,
    loading
}: StatusIndicatorProps) => {
    return (
        <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div
                                className={`w-3 h-3 rounded-full ${
                                    isConnected 
                                        ? 'bg-success shadow-sm shadow-success/20' 
                                        : 'bg-destructive shadow-sm shadow-destructive/20'
                                }`}
                            />
                            <span className="text-sm font-medium text-foreground">
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                        {lastUpdated && (
                            <div className="text-sm text-muted-foreground">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={onRefresh}
                        disabled={loading}
                        size="sm"
                        variant="outline"
                        className="border-border hover:bg-accent"
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
