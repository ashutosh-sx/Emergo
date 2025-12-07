# Emergo — Fast Aid, On the Way 🚑

Emergo is a next-generation ambulance booking platform designed to connect patients with emergency medical services in seconds. Built for speed, reliability, and real-time coordination when every moment matters.

![Emergo Hero](public/hero-ambulance.png)

## 🚀 Features

*   **Instant Booking**: one-tap request system for immediate emergency response.
*   **Real-Time Tracking**: Live GPS tracking of ambulances using Google Maps API.
*   **Smart Dispatch**: AI-driven algorithm to find the nearest available life support unit.
*   **Driver & User Portals**: Dedicated interfaces for patients and ambulance drivers.
*   **Secure Authentication**: Robust login and signup flows for all stakeholders.
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop experiences.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Database**: PostgreSQL (via Neon)
*   **ORM**: Prisma
*   **Maps**: Google Maps Platform (Directions & Maps JavaScript API)
*   **Deployment**: Vercel

## 🏁 Getting Started

### Prerequisites

*   Node.js 18+
*   PostgreSQL Database URL
*   Google Maps API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ashutosh-sx/Emergo.git
    cd Emergo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://user:password@host/db"
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your_google_maps_key"
    JWT_SECRET="your_secret_key"
    ```

4.  **Run Database Migrations:**
    ```bash
    npx prisma db push
    ```

5.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to see the app live.


