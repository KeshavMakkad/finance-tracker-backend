import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
import dotenv from "dotenv";
import { getFinancialAdvice } from "./routes/financial-suggestions";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error("MONGO_URI environment variable is not defined");
}
mongoose
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB!"))
    .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);


app.post("/api/getFinancialAdvice", async (req, res) => {
    // console.log(req)
    const { expenses } = req.body;
    // console.log(expenses)
    const advice = await getFinancialAdvice(expenses);
    // console.log(advice)
    res.json(advice);
});

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});

module.exports = app;
