const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Expense Splitter API",
            version: "1.0.0",
            description: "API to manage and split expenses among groups"
        },
    },
    apis: ["./server.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Expense Schema
const expenseSchema = new mongoose.Schema({
    groupName: String,
    totalAmount: Number,
    participants: [{ name: String, email: String, amountOwed: Number }],
    createdAt: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", expenseSchema);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense group
 *     description: Adds a new expense group with participants and amount owed.
 *     responses:
 *       201:
 *         description: Expense created successfully
 */
app.post("/expenses", async (req, res) => {
    try {
        const { groupName, totalAmount, participants } = req.body;
        const newExpense = new Expense({ groupName, totalAmount, participants });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Retrieve all expenses
 *     description: Fetches a list of all recorded expenses.
 *     responses:
 *       200:
 *         description: A list of expenses
 */
app.get("/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Retrieve a single expense by ID
 *     description: Fetches details of a specific expense record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the expense to retrieve.
 *     responses:
 *       200:
 *         description: Expense found
 *       404:
 *         description: Expense not found
 */
app.get("/expenses/:id", async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ error: "Expense not found" });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Healthcheck Route
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
