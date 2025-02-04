const express = require("express");
const { addExpense, getExpenses, updateExpense, deleteExpense, getExpenseById } = require("../controllers/expenseController");
const {isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

router.post("/expense/create", isAuthenticatedUser, addExpense);
router.get("/expense", isAuthenticatedUser, getExpenses);
router.get("/expense/:id", isAuthenticatedUser, getExpenseById);
router.put("/expense/:id", isAuthenticatedUser, updateExpense);
router.delete("/expense/:id", isAuthenticatedUser, deleteExpense);

module.exports = router;
