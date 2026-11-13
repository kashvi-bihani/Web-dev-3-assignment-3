# Inventory Management System

## Project Overview

The Inventory Management System is a backend application developed using Node.js, Express.js, MongoDB and Mongoose. It helps manage product records, monitor stock quantities, perform inventory operations and generate useful inventory reports.

The system provides RESTful APIs for creating, retrieving, updating and deleting products, along with filtering, sorting, pagination and aggregation features.

## Technologies Used

- Node.js – JavaScript runtime environment
- Express.js – Backend web framework
- MongoDB – NoSQL database
- Mongoose – MongoDB object modeling
- dotenv – Environment variable management
- Postman – API testing

## Features

1. **Product Management**
   - Create new products.
   - Retrieve all products.
   - Retrieve a product using its ID.
   - Update product details.
   - Delete products.

2. **Inventory Management**
   - Update product stock quantities.
   - Calculate stock value automatically.
   - Validate product details and stock values.

3. **Advanced Query Operations**
   - Filter products by category.
   - Filter products using minimum and maximum prices.
   - Sort products by selected fields.
   - Implement pagination for product listings.

4. **Inventory Reports**
   - Generate low-stock alerts based on reorder levels.
   - Generate category-wise inventory summaries.
   - Calculate total stock value and average price.

5. **Middleware and Error Handling**
   - Custom request logging middleware.
   - Centralized error handling.
   - Environment-based configuration.


## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products` | Create a product |
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/:id` | Retrieve product by ID |
| PUT | `/api/products/:id` | Update product details |
| PATCH | `/api/products/:id/stock` | Update stock quantity |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/products/reports/low-stock` | Generate low-stock report |
| GET | `/api/products/reports/category-summary` | Generate category-wise summary |

## Query Parameters

The product listing API supports the following query parameters:

- `category` – Filter products by category.
- `minPrice` – Set the minimum price.
- `maxPrice` – Set the maximum price.
- `sortBy` – Select the sorting field.
- `order` – Choose ascending or descending order.
- `page` – Specify the page number.
- `limit` – Specify the number of products per page.





