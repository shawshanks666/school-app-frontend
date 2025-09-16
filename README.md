School Payment and Dashboard Application

This is a full-stack monorepo for a School Payment and Dashboard application, built as part of a software developer assessment. The project consists of a NestJS backend that handles payment gateway integration and a React frontend for displaying and managing transaction data.
Tech Stack


Technologies used:

    Framework: React with Vite

    Styling: Tailwind CSS

    UI Components: shadcn/ui

    Routing: React Router

    API Communication: Axios

Frontend Setup

0. Prerequisites

    Node.js (v18 or later recommended)

    npm or yarn

1. Installation

    Navigate into the frontend folder (e.g., school-app-frontend).

    cd <your-repo-folder>/school-app-frontend

    Install the required dependencies.

    npm install

2. Environment Variables

The frontend uses an environment variable to know the URL of the backend API.

    Create a file named .env.local in the root of the frontend folder.

    Add the following variable:

    VITE_API_BASE_URL=http://localhost:3000

    Note: If you deploy your backend, update this URL to your live backend address.

3. Running the App

To start the frontend development server, run:

npm run dev

The application will be available at http://localhost:5173 (or another available port).
Frontend Pages Explained
1. Register Page (/register)

    A simple form that allows a new user to create an account by providing an email and a password.

    It includes validation for matching passwords and handles potential registration errors from the backend (e.g., if the email is already in use).
<img width="1919" height="1199" alt="image" src="https://github.com/user-attachments/assets/bfbd2062-e131-4256-8f30-cdc7ad7d8015" />

2. Login Page (/login)

    A secure form for users to sign in.

    Upon successful login, the received JWT is stored in localStorage, and the user is redirected to the main dashboard.

    It includes a link to the Register page for new users.
<img width="1919" height="1199" alt="image" src="https://github.com/user-attachments/assets/82b65c3e-2b75-43e1-996e-6e4d9fb48f91" />

3. Transactions Dashboard (/)

This is the main page of the application, accessible only to authenticated users. Its features include:

    Data Table: Displays all transactions with columns for Date, Collect ID, Custom Order ID, School ID, Gateway, Order Amount, Transaction Amount, and Status.

    Filtering: Users can filter the table by status using a dropdown menu or search for a specific schoolId.

    Sorting: Column headers for "Date", "Order Amount", and "Transaction Amount" are clickable, allowing users to sort the data in ascending or descending order.

    Pagination: "Previous" and "Next" buttons allow users to navigate through pages of transactions.

    Persistent State: All filter, sort, and page settings are stored in the URL, allowing users to bookmark or share specific views.

    Hover Animation: Table rows have a subtle "grow" animation on hover to improve user experience.

4. Status Check Page (/status-check)

    A dedicated page with a simple form where a user can enter a Transaction ID (collect_id).

    Upon submission, it calls the backend API and displays the current status of that specific transaction.

    Includes a "Back to Dashboard" link for easy navigation.
   <img width="1919" height="1199" alt="image" src="https://github.com/user-attachments/assets/c41aa8a1-b793-4e66-87bd-1e766a6065cd" />

