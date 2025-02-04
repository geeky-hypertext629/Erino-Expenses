// src/components/ExpenseList.js
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { deleteExpense } from "../services/api";
import { useNavigate } from "react-router";



const ExpenseList = ({ expenses, fetchExpenses }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      console.log("Deleting expense with id:", id);
      await deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  const handleEdit = async (id) => {
    navigate(`/createExpense/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{(new Date(expense.date)).toLocaleDateString("en-CA")}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(expense._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleEdit(expense._id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;