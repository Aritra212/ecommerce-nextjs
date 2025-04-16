# Premium Shopping - Next.js E-commerce Platform

A modern, responsive e-commerce platform built with Next.js, Supabase, and Tailwind CSS, offering a seamless shopping experience with robust product filtering, user authentication, cart management, and order processing.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Architecture](#architecture)
- [Challenges and Solutions](#challenges-and-solutions)

## ✨ Features

### User Experience

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Dynamic Product Filtering**: Filter by category, price range, and color
- **Server-side Filtering**: Efficient product filtering with URL parameter support
- **Product Search**: Search functionality across product titles and descriptions
- **Dark/Light Mode**: Theme support for user preference

### Shopping Experience

- **Wishlist Management**: Add/remove products from wishlist with persistent storage
- **Cart Management**: Add, remove, adjust quantities with real-time updates

### User Management

- **Authentication**: User registration and login with Supabase
- **User Profiles**: View and edit profile information
- **Order History**: Track past orders and their status

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Context API
- **Backend/Authentication**: Supabase
- **API Integration**: External product API with server-side filtering
- **Deployment**: Vercel

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/premium-shopping.git
   cd premium-shopping
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Supabase Setup**

   - Supabase local db setup instructions will be added soon

5. **Running the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to http://localhost:3000

## 🏗 Architecture

The application follows a modern client-server architecture with Next.js handling both frontend and API routes:

### Directory Structure

```
src/
├── app/                # Next.js App Router
│   ├── (auth)/         # Authentication routes
│   ├── (main)/         # Main application routes
│   │   ├── products/   # Product pages
│   │   ├── cart/       # Shopping cart
│   │   ├── profile/    # User profile
│   │   └── page.tsx    # Homepage
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
├── utils/              # Utility functions
│   ├── context/        # React context providers
│   ├── data-access/    # Data fetching and API functions
│   └── supabase/       # Supabase client
├── common/             # Common interfaces and types
└── lib/                # Library functions
```

## 🧩 Challenges and Solutions

### Challenge 1: Dynamic Route Parameters in Next.js 14

**Problem**: Next.js 14 requires dynamic route parameters to be awaited before use, causing errors in filter implementation.

**Solution**: Implemented proper awaiting of route parameters by using `Promise.resolve()` on searchParams objects before accessing them. This ensures compatibility with Next.js 14's asynchronous data fetching model.

### Challenge 2: Wishlist Persistence

**Problem**: Wishlist items were not persisting across sessions due to missing provider integration.

**Solution**: Added `WishlistProvider` to the main layout to ensure consistent context availability throughout the application. Implemented localStorage synchronization for persistence.

### Challenge 3: Filter URL Integration

**Problem**: Filters weren't properly reflected in URLs, making filtered views un-shareable.

**Solution**: Created a robust server-side filtering system that translates URL parameters into product filters. This allows users to share filtered views and creates a better experience with proper browser history support.

### Challenge 4: API Limitations

**Problem**: The external product API doesn't support all the filtering capabilities we wanted to implement.

**Solution**: Developed a server-side filtering utility that fetches all products and applies filters in the server component, reducing client-side computation while offering advanced filtering.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Fake Store API](https://fakestoreapi.com/)
