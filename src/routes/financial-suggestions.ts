import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"; // Can be changed

export const getFinancialAdvice = async (expenses: any) => {
    try {
        const prompt = `"Hey there! I see you've been tracking your expenses, and I want to help you manage your finances in the best way possible—just like I would for a close friend or family member. Let’s go through your spending and find ways to make your budget work smarter for you.

        I'll provide you with personalized suggestions, practical steps, and smart budgeting tips to help you save more, spend wisely, and still enjoy life without financial stress. Think of me as your financial buddy, here to guide you every step of the way! All the amounts are in rupees" ${JSON.stringify(expenses)} Transactions END`;
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${HF_MODEL}`,
            { inputs: prompt },
            { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );
        // console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error getting AI financial advice:", error);
        return { error: "Failed to generate advice." };
    }
};

