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
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div
                                className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            />
                            <span className="text-sm font-medium">
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                        {lastUpdated && (
                            <div className="text-sm text-gray-500">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={onRefresh}
                        disabled={loading}
                        size="sm"
                        variant="outline"
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
