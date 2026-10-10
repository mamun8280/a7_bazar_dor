# 🛒 BazarDor — বাজার দর

### প্রয়োজনীয় পণ্যের দাম এক নজরে।

BazarDor is a responsive web application that helps users explore everyday essential products and view their prices in one place. The website provides an easy-to-use interface for checking product prices and comparing market information.

## 🌐 Live Website

🔗 https://a7-bazar-dor-gamma.vercel.app/

## ✨ Features

- 🛍️ **Product Listings** — Browse essential products in a responsive grid.
- 📈 **Price Increase Section** — Explore products whose prices have increased.
- 📉 **Price Decrease Section** — Explore products whose prices have decreased.
- 🔎 **Product Details** — View detailed information about individual products.
- 🔐 **Authentication** — Sign up and sign in using email and password.
- 🌐 **Social Authentication** — Sign in with Google and GitHub.
- 📱 **Responsive Design** — Works across mobile, tablet, and desktop screens.
- 🔔 **Toast Notifications** — Receive feedback for authentication actions and errors.
- 🧭 **Easy Navigation** — Navigate between the home page, authentication pages, and product details.

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- React Toastify
- React Icons
- Vercel

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd YOUR_PROJECT_FOLDER
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure the required environment variables:

   ```env
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=your_secret
   MONGODB_URL=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

   Replace the placeholder values with your own credentials. Never commit `.env.local` or expose your secret keys.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Authentication

BazarDor uses Better Auth for authentication.

Users can:
- Create an account with email and password.
- Sign in with an existing account.
- Authenticate using Google or GitHub.

Social authentication requires valid OAuth credentials and correctly configured callback URLs.

## 📱 Responsive Design

The interface adapts to different screen sizes:

- **Mobile:** Compact layout and vertically stacked content.
- **Tablet:** Flexible spacing and responsive product grids.
- **Desktop:** Wider content layout and multi-column product grids.

## ⚠️ Price Disclaimer

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

## 👨‍💻 Author

**Mamun Sheikh**

GitHub: [Your GitHub Profile](https://github.com/)

## 📄 License

This project was created for educational and project development purposes.