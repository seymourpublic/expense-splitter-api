# Expense Splitter API

## Overview
The Expense Splitter API is a Node.js and Express-based application that helps users split expenses among groups. It allows users to track shared expenses, generate reports, and integrate with payment platforms.

## Features
- Create and manage expense groups
- Retrieve expense records
- Generate sharable PDF reports
- API documentation via Swagger
- Health check endpoint
- MongoDB database integration

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Swagger for API documentation
- PDFKit for report generation

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/expense-splitter-api.git
   cd expense-splitter-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```sh
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expense-splitter
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Documentation
Swagger documentation is available at:
```
http://localhost:5000/api-docs
```

## API Endpoints

### Health Check
- `GET /health` - Checks if the API is running.

### Expenses
- `POST /expenses` - Create a new expense group.
- `GET /expenses` - Retrieve all expense groups.
- `GET /expenses/{id}` - Retrieve details of a specific expense.
- `GET /expenses/{id}/report` - Generate a PDF report for an expense.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License.
