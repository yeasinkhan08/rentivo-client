# RENTIVO — Equipment Rental Platform (Client)

RENTIVO is a rental marketplace where equipment owners list their equipment and
customers browse, book and pay for it online, with admin approval and
platform-wide monitoring.

## Purpose
The platform connects equipment owners and customers through a transparent and
secure rental marketplace. Owners manage listings, customers rent for a chosen
period, and admins approve listings and monitor all activity.

## Live URL
- Client: https://rentivo-ten.vercel.app/
- Server API: https://rentivo-server-b2al.onrender.com/
- Server repository: https://github.com/yeasinkhan08/rentivo-server

## Admin Access
The admin email and password are provided in the assignment submission form.

## Test Payment
Payments run in Stripe test mode. Use card `4242 4242 4242 4242`, any future
expiry date and any 3-digit CVC.

## Key Features
- Email and password registration with validation (uppercase, lowercase, minimum 6 characters)
- Google login (new Google users get the Customer role)
- JWT-secured API requests with role-based access control (Customer, Owner, Admin)
- Protected dashboard and private routes that survive a page reload
- Home page: animated banner, 6 featured equipment, categories, why choose us, how it works, customer reviews and owner call-to-action (Framer Motion)
- All Equipment page: 3-column grid with server-side search (name, location), filters (category, rental type, price range, availability), sorting (price low to high, high to low, recently added) and pagination
- Private equipment details page with owner information and rental terms
- Favorites: add and remove equipment, saved in the database
- Booking modal with date and quantity selection, availability check and automatic total calculation
- Secure Stripe Checkout; the booking and transaction are saved after successful payment
- Customer dashboard: My Rentals, Favorites, Profile
- Owner dashboard: Add Equipment (image upload with imgbb), My Equipment (view, update, delete), My Equipment Rental, Profile
- Admin dashboard: All Users (change role), All Equipment (approve, reject, update, delete), All Rentals, Profile
- Dashboard analytics with charts for Admin and Owner
- About Us, Contact Us (messages saved in the database) and How It Works pages
- Dark and light theme with the preference saved in local storage
- Responsive layout for mobile, tablet and desktop
- Loading page, error page and custom 404 page

## Technologies
Next.js (App Router), React, Tailwind CSS, ShadCN UI, BetterAuth with the
MongoDB adapter, MongoDB, Stripe

## npm Packages Used
- next, react, react-dom
- tailwindcss, @tailwindcss/turbopack, tw-animate-css
- shadcn, @base-ui/react, class-variance-authority, clsx, tailwind-merge, cmdk
- better-auth, @better-auth/mongo-adapter, mongodb, jsonwebtoken
- framer-motion, recharts
- lucide-react, react-icons, sonner
- date-fns, react-day-picker



## Run Locally
```
git clone https://github.com/yeasinkhan08/rentivo-client.git
cd rentivo-client
npm install
npm run dev
```
The app runs at http://localhost:3000. The server must also be running; see the
server repository.

screnshots:
<img width="1873" height="873" alt="image" src="https://github.com/user-attachments/assets/92023868-c999-4272-8fdd-771602e52696" />
<img width="1678" height="815" alt="image" src="https://github.com/user-attachments/assets/b46a6b37-fa81-4e52-8374-199055313468" />
<img width="1801" height="780" alt="image" src="https://github.com/user-attachments/assets/6e715ea0-5358-4f6f-8395-f271e1b9d923" />
<img width="908" height="756" alt="image" src="https://github.com/user-attachments/assets/8a52105d-6b8b-4f65-8cd8-b549c447cd7d" />

<img width="462" height="841" alt="image" src="https://github.com/user-attachments/assets/d351169e-7d14-4e02-a6a5-61b858710623" />
<img width="1168" height="867" alt="image" src="https://github.com/user-attachments/assets/28cf511e-0dca-4d9e-aa3f-967b7a4186b3" />
<img width="1887" height="846" alt="image" src="https://github.com/user-attachments/assets/6df2fb9a-f6ec-4493-a14e-5b1a7b6bf41b" />



