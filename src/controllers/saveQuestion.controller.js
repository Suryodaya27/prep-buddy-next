const JWT_SECRET = "suryodayapandey";
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { ApiError } from "@/lib/apiError";

async function saveToDatabase(question, answer, token) {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    // console.log(decodedToken);
    const userId = decodedToken.userId;
    
    
    const result = await prisma.questions.create({
      data: {
        question,
        answer,
        userId,
      },
    });
    return result;
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occurred"
    );
  }
}

export default async function saveQuestion(question, answer, token) {
  // console.log("saveQuestion");
  // console.log(question, answer, token);
  try {
    const result = await saveToDatabase(question , answer , token);
    // console.log(result);
    return { result };
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occured"
    );
  }
}
