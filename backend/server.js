const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // ✅ Mongoose-based connection
const userRoutes = require('./routes/userRoutes');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB using Mongoose
connectDB();

// Middleware

app.use(cors({
  origin: ['https://lockr-six.vercel.app/landing',"http://localhost:5173/landing"],// ✅ your Vercel frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth-temp.js"));       // Auth routes
app.use("/api/passwords", require("./routes/passwordRoutes")); // Password routes
app.use('/api/audit-logs', require('./routes/auditRoutes')); //audit log routes
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/user', userRoutes);



// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
