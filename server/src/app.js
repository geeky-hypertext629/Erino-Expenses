const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const user = require("./routes/userRoute");
const expenses = require("./routes/expenseRoute");
const insights = require("./routes/insightRoute");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(` MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    process.exit(1); // Exit on connection failure
  }
};




const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow only your frontend
    credentials: true, // Allow cookies
  })
);

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1",user);
app.use("/api/v1",expenses);
app.use("/api/v1",insights);

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected! Reconnecting...");
  connectDatabase(); 
});


connectDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});