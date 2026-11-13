require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const logger = require("./middleware/logger");
const {
    notFound,
    errorHandler
} = require("./middleware/errorHandler");

const app = express();

app.use(express.json());


app.use(logger);


app.get("/", (req, res) => {
    res.send("Inventory Management System API is Running!");
});


app.use("/api/products", productRoutes);


app.use(notFound);
app.use(errorHandler);


const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server Error:", error.message);
        process.exit(1);
    }
};

startServer();
