
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, MenuItem, Pagination, Button } from "@mui/material";
import ExpenseList from "../components/ExpenseList";
import SpendingChart from "../components/SpendingChart";
import { getExpenses } from "../services/api";
import { insightOnExpense, logout  } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = ({setIsAuthenticated}) => {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
    const [insights, setInsights] = useState([]);
    const [totalSpending, setTotalSpending] = useState(0);
    const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, [page, filters]);

    const fetchInsights = async () => {
      try {
        const response = await insightOnExpense();
        setInsights(response.data.insights);
        setTotalSpending(response.data.totalSpending);
      } catch (error) {
        console.error("Error fetching spending insights:", error);
      }
    };

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses({ page, ...filters });
      console.log(response);
      setExpenses(response.data.expenses);
      setTotalPages(response.data.totalPages);
      fetchInsights();
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleFilterChange = (e) => {
    if(e.target.name === "category" && e.target.value === "All") 
    setFilters({ ...filters, [e.target.name]: "" });
    else{
      setFilters({ ...filters, [e.target.name]: e.target.value });
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function
      setIsAuthenticated(false) // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>


      <Box display="flex" justifyContent="space-between" mb={3}>
   
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/createExpense")}
        >
          Create Expense
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>


      <Box mb={3}>
        <TextField
          select
          label="Category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          sx={{ mr: 2 , width: 200}}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Gadget">Gadget</MenuItem>
          <MenuItem value="Clothing">Clothing</MenuItem>
          <MenuItem value="Rent/Electricity">Rent/Electricity</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
          {/* Add more categories */}
        </TextField>
        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mr: 2 }}
        />
        <TextField
          label="End Date"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses}/>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
      <SpendingChart insights={insights} totalSpending={totalSpending} />
    </Container>
  );
};

export default Dashboard;