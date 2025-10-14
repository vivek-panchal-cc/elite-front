# Elite Store Customer

A modern e-commerce platform built with Next.js 15.4.5, featuring a robust customer interface for managing purchases, orders, and rewards.

## Features

- 🛒 Shopping Cart Management
- 💳 Secure Checkout Process
- 📊 Customer Dashboard
- 🎁 Rewards System
- 📱 Responsive Design
- 🔐 Authentication & Authorization
- 📊 Real-time Analytics
- 🎯 Special Offers Section
- 📋 Order History
- 💰 Super Bonus System

## Tech Stack

- **Framework:** Next.js 15.4.5
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** TailwindCSS
- **UI Components:** 
  - Radix UI
  - Shadcn Components
- **Data Fetching:** TanStack Query (React Query)
- **Forms:** Formik + Yup
- **Charts:** Chart.js, Recharts
- **HTTP Client:** Axios
- **Authentication:** Custom Auth Provider

## Project Structure

```
├── app/                   # Next.js 13+ App Router
│   ├── (private)/         # Protected Routes
│   ├── (public)/          # Public Routes
│   └── sections/          # Page Sections
├── components/            # Reusable Components
├── hooks/                 # Custom React Hooks
├── http/                  # API Client Setup
├── lib/                   # Utility Functions
├── stores/                # Zustand Store Definitions
└── types/                 # TypeScript Type Definitions
```

## Prerequisites

- Node.js 22.14.0 or later
- npm or yarn or pnpm or bun

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/prashantcct/elite_store_customer.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Starts development server with turbopack
- `npm run build` - Creates production build
- `npm start` - Starts production server
- `npm run lint` - Runs ESLint for code linting

## Environment Variables

Create a `.env` file in the root directory with the following variables:
(Check `lib/env.ts` for required environment variables)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

---

Project maintained by vivekpanchal
