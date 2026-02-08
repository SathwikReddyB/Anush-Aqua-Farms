# Anush Aqua Farms - Backend

This is the backend for Anush Aqua Farms, built with Node.js, Express, and MySQL (Sequelize).

## Prerequisites
- Node.js (v18+)
- MySQL Server

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    cd backend
    npm install
    ```

2.  **Configure Database**
    - Create a MySQL database (e.g., `aquafarms`).
    - Create a `.env` file in the `backend` directory (copy from `.env.example` or use below):
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=aquafarms
    JWT_SECRET=your_secret_key
    ```

3.  **Sync Database Schema**
    - Run the sync script to create tables in your MySQL database:
    ```bash
    node src/scripts/syncDb.js
    ```
    - Alternatively, starting the server will also attempt to sync.

4.  **Start Server**
    ```bash
    # Development
    npm run dev

    # Production
    npm start
    ```

## Database Schema (MySQL)

This project uses Sequelize ORM. The schema allows for:

- **Users**: Stores user info, password hash, role ('user' or 'admin').
- **Addresses**: Multiple addresses per user.
- **Products**: Water products with pricing and stock.
- **Orders**: Order details, linked to User and Address.
- **OrderItems**: Pivot table for Products in an Order.

### Table Relationships
- `Users` (1) <-> (N) `Addresses`
- `Users` (1) <-> (N) `Orders`
- `Orders` (1) <-> (N) `OrderItems`
- `Products` (1) <-> (N) `OrderItems`

## API Endpoints

### Authentication
- `POST /auth/register`: Register new user (body: name, email, password, phone, role[optional, default 'user'])
- `POST /auth/login`: Login (body: email, password) -> Returns JWT
- `GET /auth/me`: Get current user details (Headers: `Authorization: Bearer <token>`)

### Products
- `GET /products`: List all products
- `POST /products`: Add product (Admin only)
- `PUT /products/:id`: Update product (Admin only)
- `DELETE /products/:id`: Delete product (Admin only)

### Orders
- `POST /orders`: Place order (Auth required)
- `GET /orders/my-orders`: Get logged-in user's orders
- `GET /orders/all`: Get all orders (Admin only)
- `PATCH /orders/:id/status`: Update status (Admin only)

## MySQL Connection
If you have MySQL Workbench:
1.  Create a new connection to `localhost` (or your host).
2.  Create a schema named `aquafarms` (or whatever matches your `.env`).
3.  Run the backend to auto-generate tables, or check `src/models` for structure.
