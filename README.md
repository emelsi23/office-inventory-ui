Office Inventory Frontend

Frontend application for managing office equipment and maintenance tasks. Built with Vue 3, Bootstrap 5, and SweetAlert2.

---

Tech Stack

Vue 3
Bootstrap 5
SweetAlert2
Vite
Axios

---

Features

View and manage equipment list
Assign equipment to maintenance tasks
Add/edit equipment with type, serial number, and purchase date
Paginated tables with responsive design
User-friendly alerts and confirmations
Modular components and clean architecture

---

Project Structure

src/
├── assets/               # Static files
├── components/           # Vue components (EquipmentForm.vue, EquipmentTaskSelector.vue, etc.)
├── views/                # Page-level components (Home.vue, EquipmentList.vue, etc.)
├── services/             # API interaction services
├── App.vue               # Main app shell
└── main.js               # Entry point

---

Setup

# Clone the repository
git clone https://github.com/emelsi23/office-inventory-ui.git
cd inventory-frontend

# Install dependencies
npm install

# Run the dev server
npm run dev

---

Environment

Make sure to set the API URL in your environment if needed:

VITE_API_BASE_URL=http://localhost:5000/api

---

Scripts

npm run dev         # Run development server
npm run build       # Build for production
npm run lint        # Lint code (if ESLint is configured)

---
