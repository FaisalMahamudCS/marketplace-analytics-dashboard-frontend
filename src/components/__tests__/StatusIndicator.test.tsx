import { render, screen, fireEvent } from '@testing-library/react';
import { StatusIndicator } from '@/components/StatusIndicator';

describe('StatusIndicator', () => {
    const defaultProps = {
        isConnected: true,
        lastUpdated: new Date('2024-01-01T12:00:00Z'),
        onRefresh: jest.fn(),
        loading: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render connected status', () => {
        render(<StatusIndicator {...defaultProps} />);

        expect(screen.getByText('Connected')).toBeInTheDocument();
        expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    });

    it('should render disconnected status', () => {
        render(<StatusIndicator {...defaultProps} isConnected={false} />);

        expect(screen.getByText('Disconnected')).toBeInTheDocument();
    });

    it('should call onRefresh when refresh button is clicked', () => {
        render(<StatusIndicator {...defaultProps} />);

        const refreshButton = screen.getByText('Refresh');
        fireEvent.click(refreshButton);

        expect(defaultProps.onRefresh).toHaveBeenCalledTimes(1);
    });

    it('should disable refresh button when loading', () => {
        render(<StatusIndicator {...defaultProps} loading={true} />);

        const refreshButton = screen.getByText('Refreshing...');
        expect(refreshButton).toBeDisabled();
    });

    it('should handle missing lastUpdated', () => {
        render(<StatusIndicator {...defaultProps} lastUpdated={null} />);

        expect(screen.queryByText(/Last updated:/)).not.toBeInTheDocument();
    });

    it('should show loading state on refresh button', () => {
        render(<StatusIndicator {...defaultProps} loading={true} />);

        expect(screen.getByText('Refreshing...')).toBeInTheDocument();
    });
});
