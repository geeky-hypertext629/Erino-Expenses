// src/components/SpendingChart.js
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { insightOnExpense } from "../services/api";
import { Box, Typography } from "@mui/material";

const SpendingChart = ({insights,totalSpending}) => {



  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <Box mt={5}>
      <Typography variant="h5" align="center" gutterBottom>
        Spending Insights
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Total Spending: ${totalSpending}
      </Typography>

      {/* Bar Chart */}
      <Typography variant="h6" align="center" gutterBottom>
        Category-wise Spending (Bar Chart)
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "50px"}}>
      <BarChart
        width={600}
        height={300}
        data={insights}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalAmount" fill="#8884d8" />
      </BarChart>
      </Box>

      {/* Pie Chart */}
      <Typography variant="h6" align="center" gutterBottom>
        Category-wise Spending (Pie Chart)
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center"}}>
      <PieChart width={600} height={400}>
        <Pie
          data={insights}
          dataKey="totalAmount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {insights.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </Box>
    </Box>
  );
};

export default SpendingChart;