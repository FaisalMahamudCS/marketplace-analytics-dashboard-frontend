#  Marketplace Analytics Dashboard

Hey there!  This is a real-time marketplace analytics dashboard I built using Next.js. It's designed to help you monitor marketplace data as it happens, with beautiful charts and a responsive design that works great on both desktop and mobile.

## What's Cool About This Dashboard

- **Live Updates**: Data flows in real-time via WebSocket - no more refreshing the page!
- **Beautiful Charts**: Interactive line charts that show marketplace trends using Recharts
- **Works Everywhere**: Mobile-first design that adapts perfectly to any screen size
- **Smart Layouts**: Tables on desktop, cards on mobile - whatever works best for the user
- **Handles Errors Gracefully**: When things go wrong, users get helpful messages instead of blank screens
- **TypeScript**: Everything is properly typed, so fewer bugs and better developer experience
- **Well Tested**: Comprehensive test suite to make sure everything works as expected
- **Auto-Deploy**: Push to main branch and it deploys automatically

## How It's Built

I chose these technologies for good reasons:

### Next.js 15
- **App Router**: The new routing system is just better - faster and more intuitive
- **Server Components**: Better performance with server-side rendering
- **Built-in Optimizations**: Code splitting and image optimization happen automatically

### Tailwind CSS
- **Utility-First**: Write styles super fast with consistent design tokens
- **Mobile-First**: Responsive design is built into the approach
- **Customizable**: Easy theming and dark mode support

### Recharts
- **React Native**: Charts that feel like part of the React ecosystem
- **Responsive**: Charts automatically adapt to different screen sizes
- **Customizable**: Easy to style and modify

### Socket.io-client
- **Real-time Magic**: Bidirectional communication with automatic fallbacks
- **Reconnection**: If the connection drops, it automatically reconnects
- **Cross-browser**: Works everywhere, even with older browsers

## Project Structure

Here's how I organized the code:

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main dashboard page
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (Button, Card, etc.)
│   ├── MarketplaceChart.tsx # Chart visualization component
│   ├── DataTable.tsx      # Desktop table view
│   ├── DataCards.tsx      # Mobile card view
│   └── StatusIndicator.tsx # Connection status component
├── hooks/                 # Custom React hooks
│   └── useDashboard.ts   # Main dashboard state management
├── lib/                   # Utility libraries
│   ├── api.ts            # API service layer
│   ├── socket.ts         # WebSocket client
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
    └── marketplace.ts    # Data type definitions
```

## Getting Started

### What You'll Need
- Node.js 18.x or higher (I recommend using the latest LTS version)
- npm or yarn (I used npm, but yarn works great too)

### Let's Get This Running

1. **Clone the repo**
   ```bash
   git clone <repository-url>
   cd marketplace-analytics-dashboard-frontend
   ```

2. **Install the dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment**
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start the dev server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Go to [http://localhost:3000](http://localhost:3000) and you should see the dashboard!

### Available Commands

- `npm run dev` - Start the development server (with hot reload)
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Check code quality
- `npm run test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode (great for TDD)
- `npm run test:coverage` - Run tests and generate coverage report

## Testing Strategy

I focused on testing the core business logic because that's where bugs hurt the most:

### What I Tested
- **API Service**: All the HTTP requests and error handling
- **Dashboard Hook**: The state management and real-time updates
- **Status Indicator**: The connection status component

### Why These Components?
1. **API Service**: This is where data comes from - if this breaks, everything breaks
2. **Dashboard Hook**: This manages all the state and real-time updates - the heart of the app
3. **Status Indicator**: Users need to know if they're connected or not

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode (my favorite for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## CI/CD Pipeline

I set up GitHub Actions to automatically:
1. **Test on multiple Node versions** (18.x and 20.x)
2. **Run linting** to catch code quality issues
3. **Generate coverage reports** and upload to Codecov
4. **Build the app** to make sure it works in production
5. **Deploy to Vercel** automatically when pushing to main

## Responsive Design

The dashboard works great on all devices:

- **Mobile**: Card-based layout that's easy to scroll through
- **Tablet**: Optimized for touch with larger targets
- **Desktop**: Full table view with all the data visible

I used Tailwind's responsive utilities to make this happen:
- Mobile: Default styles
- Tablet (`md:`): 768px and up
- Desktop (`lg:`): 1024px and up

## Backend Integration

This frontend expects a backend with these endpoints:

- `GET /responses` - Get all historical data
- `GET /responses/:id` - Get a specific response by ID
- `GET /responses/latest` - Get the most recent response

And WebSocket events:
- `newResponse` - Real-time data updates

The data should look like this:
```typescript
interface MarketplacePayload {
  timestamp: number;
  activeDeals: number;
  newDeals: number;
  averageDealValueUSD: number;
  offersSubmitted: number;
  userViews: number;
}
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add your environment variables in the Vercel dashboard
3. Push to main branch and it deploys automatically!

### Manual Deployment
```bash
npm run build
npm run start
```

## What's Next?

### Short-term Ideas
- **Data Filtering**: Let users filter by date range or specific metrics
- **Export Features**: Download data as CSV or PDF
- **Notifications**: Browser notifications for significant changes
- **Performance**: Virtual scrolling for really large datasets

### Long-term Vision
- **Advanced Analytics**: Statistical analysis and trend predictions
- **Custom Dashboards**: Let users create their own dashboard layouts
- **Multi-tenant**: Support multiple marketplace instances
- **Mobile App**: React Native app for on-the-go monitoring

## Contributing

I'd love your help! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-awesome-feature`)
3. Make your changes
4. Commit with a clear message (`git commit -m 'Add your awesome feature'`)
5. Push to your branch (`git push origin feature/your-awesome-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - feel free to use it however you want!




## Thanks!

Big thanks to the amazing open source community:
- Next.js team for the incredible framework
- Tailwind CSS for making styling fun again
- Recharts for beautiful, responsive charts
- Socket.io for making real-time communication easy

---
