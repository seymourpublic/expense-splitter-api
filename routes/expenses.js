const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Create a new expense
router.post("/", async (req, res) => {
    try {
        const { groupName, totalAmount, participants } = req.body;
        const newExpense = new Expense({ groupName, totalAmount, participants });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single expense by ID
router.get("/:id", async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ error: "Expense not found" });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Payment processing (Stubbed)
router.post("/pay", (req, res) => {
    res.json({ message: "Payment processing (stub)" });
});

module.exports = router;
