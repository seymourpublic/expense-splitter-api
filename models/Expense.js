const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    participants: [
        {
            name: String,
            email: String,
            amountOwed: Number,
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
