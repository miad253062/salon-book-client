# SalonBook — Salon Appointment Booking Platform (Client)

SalonBook is a role-based salon appointment booking web application where customers can explore salon services, search and filter offerings, submit appointment requests, and pay for confirmed bookings online through Stripe. Salon administrators can create and manage services, confirm or cancel appointment requests, manage registered users, and monitor payment transactions.

## Live Website & Repository Links

- **Live Website:** [https://salon-book-client-pjan.vercel.app/]
- **Client GitHub Repository:** [https://github.com/miad253062/salon-book-client](https://github.com/miad253062/salon-book-client)
- **Server GitHub Repository:** [https://github.com/miad253062/salon-book-server](https://github.com/miad253062/salon-book-server)

## Important Features

### Public & Authentication
- **Role-Based Authentication:** Supports Email/Password sign-up and sign-in alongside Google OAuth powered by Better Auth.
- **Password Validation:** Enforces a minimum of 6 characters with at least one uppercase and one lowercase letter during registration.
- **Home & Browse Services:** Displays featured active services, service categories, search by service name, category filtering, and sorting by price without requiring login.

### Customer Features
- **Protected Service Details & Booking:** Authenticated customers can view service details (`/services/[id]`) and request appointments for active services while preventing duplicate bookings for the same date and time slot.
- **Customer Dashboard:** Provides an overview of total, pending, confirmed, and cancelled appointments along with complete booking history.
- **Appointment & Payment Management:** Customers can cancel pending appointment requests, pay for confirmed appointments via Stripe Checkout, and update their profile information.

### Admin Features
- **Admin Dashboard Overview:** Displays total registered customers, active services, total appointments, pending and confirmed counts, and successful payment summaries.
- **Service Management:** Add, update, delete, and activate/deactivate salon services with direct image upload via ImgBB.
- **Appointment & User Management:** Confirm pending appointments, cancel pending or confirmed appointments, and block or unblock customer accounts.
- **Transaction History:** Monitor completed Stripe payment records and session references.

## Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Authentication:** Better Auth (Email/Password & Google OAuth)
- **Payments:** Stripe Checkout
- **Image Hosting:** ImgBB API

## Installation Instructions

1. Clone the client repository:
   ```bash
   git clone https://github.com/miad253062/salon-book-client.git
   cd salon-book-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` or `.env.local` file in the root directory and add the required environment variables listed below.

## Required Environment Variables

Create an environment file in the root directory containing only the variable names below (never commit actual secret keys to GitHub):

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
```

## How to Run the Project Locally

1. Ensure the Express backend server is running locally (default: `http://localhost:8000`).
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.