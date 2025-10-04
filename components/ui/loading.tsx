import { Card, CardContent } from '@/components/ui/card';

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export const LoadingCard = () => (
  <Card>
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </CardContent>
  </Card>
);

export const ErrorMessage = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <Card className="border-red-200 bg-red-50">
    <CardContent className="p-6">
      <div className="text-center">
        <div className="text-red-600 font-medium mb-2">Error</div>
        <div className="text-red-500 text-sm mb-4">{message}</div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </CardContent>
  </Card>
);
