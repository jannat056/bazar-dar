# Bazar Dor - Daily Grocery Price Tracker

A modern web application designed to track and compare daily grocery and essential market prices in Bangladesh. Built with pixel-perfect fidelity to the original Figma design.

---

## Key Features

* **Real-Time Price Tracking:** Keep an eye on daily price fluctuations (increased/decreased) for rice, lentils, oil, vegetables, meat, eggs, and spices.
* **Secure Authentication:** Built with Better Auth supporting Email OTP verification and seamless session management.
* **Dark & Light Mode:** Fully integrated theme switcher powered by next-themes and DaisyUI for an optimal viewing experience.
* **Figma-Accurate UI:** Clean, responsive, and minimalist interface tailored precisely to design specifications.
* **User Profile & Management:** Secure dashboard to view and update account details.

---

## Tech Stack

* **Frontend & Framework:** Next.js (App Router, Turbopack)
* **Styling:** Tailwind CSS, DaisyUI, Lucide Icons
* **Authentication:** Better Auth (with Email OTP via Resend)
* **Database:** MongoDB & Mongoose
* **Deployment:** Vercel

---

## Getting Started Locally

Follow these steps to run the project locally on your machine:

### 1. Clone the repository

```bash
git clone https://github.com/jannat056/bazar-dar.git
cd bazar-dar

```

### 2. Install dependencies

```bash
npm install

```

### 3. Set up Environment Variables

Create a .env.local file in the root directory and add your credentials:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_super_secret_32_character_key
BETTER_AUTH_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key

```

### 4. Run the development server

```bash
npm run dev

```

Open http://localhost:3000 with your browser to see the result.

---

## Development Notes

* During development on the free tier of Resend, OTP verification codes will also be securely outputted to your terminal console for testing convenience.

---

## Author

* **Jannat Jemi** 