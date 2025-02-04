// src/pages/AddEditExpense.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, MenuItem } from "@mui/material";
import { addExpense, editExpense, getExpenseById } from "../services/api";

const AddEditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      fetchExpense();
    }
  }, [id]);

  const fetchExpense = async () => {
    try {
      const response = await getExpenseById(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await editExpense(id, formData);
      } else {
        await addExpense(formData);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center">
          {id ? "Edit Expense" : "Add Expense"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Gadget">Gadget</MenuItem>
                      <MenuItem value="Clothing">Clothing</MenuItem>
                      <MenuItem value="Rent/Electricity">Rent/Electricity</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
            {/* Add more categories */}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            {id ? "Update Expense" : "Add Expense"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddEditExpense;