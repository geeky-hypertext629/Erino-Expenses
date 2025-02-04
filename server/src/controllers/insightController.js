const Expense = require("../models/expenseModel");

// Get Spending Insights
const getSpendingInsights = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      { $match: { userId: req.user._id } }, // Filter by user
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }, // Sum expenses per category
        },
      },
      {
        $project: {
          category: "$_id",
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);

    // Calculate percentage distribution
    const totalSpending = expenses.reduce((sum, e) => sum + e.totalAmount, 0);
    const insights = expenses.map((e) => ({
      category: e.category,
      totalAmount: e.totalAmount,
      percentage: totalSpending ? ((e.totalAmount / totalSpending) * 100).toFixed(2) : 0,
    }));

    res.json({ totalSpending, insights });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSpendingInsights };
