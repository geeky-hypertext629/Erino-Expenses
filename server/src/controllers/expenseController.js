const Expense = require("../models/expenseModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");





const getExpenseById = catchAsyncErrors(async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });

  if (!expense) return res.status(404).json({ message: "Expense not found" });

  res.status(200).json(expense);
});
// Add Expense
const addExpense = catchAsyncErrors(async (req, res) => {
    const { amount, category, date, description } = req.body;
    if (!amount || !category || !date) return res.status(400).json({ message: "Missing required fields" });

    const expense = await Expense.create({
      userId: req.user._id,
      amount,
      category,
      date,
      description,
    });

    res.status(201).json(expense);

});

// Get Expenses with Pagination & Filtering
const getExpenses = catchAsyncErrors(async (req, res) => {
    const { category, startDate, endDate, page = 1, limit = 10 } = req.query;
    const filters = { userId: req.user._id };

    if (category) filters.category = category;
    if (startDate && endDate) filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };

    const expenses = await Expense.find(filters)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalExpenses = await Expense.countDocuments(filters);

    res.status(201).json({ expenses, totalPages: Math.ceil(totalExpenses / limit) });

});

// Update Expense
const updateExpense = catchAsyncErrors(async (req, res) => {

    const { amount, category, date, description } = req.body;
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.date = date ?? expense.date;
    expense.description = description ?? expense.description;

    await expense.save();
    res.status(201).json(expense);

});

// Delete Expense
const deleteExpense = catchAsyncErrors(async (req, res) => {

    const expense = await Expense.findOneAndDelete({ _id: req.params.id });

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.status(201).json({ message: "Expense deleted successfully" });
 
});

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense, getExpenseById };
