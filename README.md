RentalsKE Frontend

🚀 Overview

This is the frontend application for RentalsKE, a multi-tenant SaaS platform that allows businesses to manage their rental listings. The frontend is built with React + TypeScript, styled using TailwindCSS, and communicates with a Django backend via API.

📌 Features

✅ Multi-tenant branding (Custom Logo & Colors)
✅ User Authentication (Login & Registration)
✅ Role-based Access Control (Admin & Client)
✅ Listing Management (Add, Edit, Delete, View Listings)
✅ Responsive UI with TailwindCSS
✅ API Integration with Django backend

🛠️ Tech Stack
 • Frontend: React, TypeScript, Vite, TailwindCSS
 • State Management: React Hooks (useState, useEffect)
 • Routing: React Router
 • HTTP Requests: Axios
 • Authentication: JWT-based (Django backend)
 • Deployment: Docker & Nginx

⚙️ Installation & Setup

1️⃣ Clone the repository

git clone <https://github.com/your-username/rentalske-frontend.git>
cd rentalske-frontend

2️⃣ Install dependencies

yarn install

3️⃣ Start the development server

yarn run dev

 • The frontend will run on <http://localhost:3000>.

🔌 API Configuration

The frontend communicates with the Django API at:

<http://localhost:8000/api/v1/>

To modify the API URL, update src/config.ts:

export const API_BASE_URL = "<http://localhost:8000/api/v1>";

🚀 Running with Docker

 1. Build the Docker Image

docker build -t rentalske-frontend .

 2. Run the Container

docker run -p 3000:80 rentalske-frontend

 • The application will be accessible at <http://localhost:3000>.

🧑‍💻 Project Structure

📂 src
 ┣ 📂 assets           # Static images & logos
 ┣ 📂 components       # Reusable UI components (Sidebar, Navbar, Buttons)
 ┣ 📂 pages           # Main pages (Login, Register, Dashboard)
 ┣ 📂 utils           # Helper functions
 ┣ 📂 styles          # TailwindCSS styles
 ┣ 📜 App.tsx         # Main application file
 ┣ 📜 main.tsx        # Entry point
 ┣ 📜 routes.tsx      # React Router configuration
 ┗ 📜 config.ts       # API URL Configuration

👤 User Roles

Role Permissions
Admin Can manage all listings, users & tenants
Client Can only manage their own listings

🎨 Theming & Branding

Each tenant gets:
 • A unique logo
 • Custom primary & secondary colors
 • Data isolation per tenant

💡 How it works:
 • Tenant data is stored in localStorage
 • On login, UI applies branding dynamically

🔐 Authentication Flow

 1. User registers under a specific tenant
 2. Backend validates & assigns a JWT token
 3. Token is stored in localStorage
 4. Dashboard is loaded based on tenant theme

🐛 Debugging

1️⃣ Tenant not loading?
 • Check if the tenant is stored in localStorage

console.log(localStorage.getItem("tenant"));

 • Ensure correct API response from /api/v1/auth/login/

2️⃣ UI theme not updating?
 • Refresh the page
 • Make sure useEffect() properly loads tenant data
 • Verify localStorage updates after login

🚀 Future Improvements

🔹 Multi-language support
🔹 Mobile-friendly UI
🔹 Advanced analytics dashboard
🔹 Subdomain-based tenant routing

👨‍💻 Contributors
 • Copain Fabrice Bienaime (@cop1fab)
 • Your Team Members

📄 License

This project is licensed under MIT License.

🚀 Start your RentalsKE journey now! 🚀
