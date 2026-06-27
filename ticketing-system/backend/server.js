const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tickets",ticketRoutes);

connectDB();

app.get('/api/health',(req, res) => {
    res.json({message: "Server is up and running smoothly!"});
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});