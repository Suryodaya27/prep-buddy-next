const JWT_SECRET = "suryodayapandey";
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { ApiError } from "@/lib/apiError";

async function saveToDatabase(title, token) {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    // console.log(decodedToken);
    const userId = decodedToken.userId;
    
    
    const result = await prisma.quizes.create({
      data: {
        title:title,
        userId:userId
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

export default async function createQuiz(title, token) {
  // console.log("saveQuestion");
  // console.log(question, answer, token);
  try {
    const result = await saveToDatabase(title , token);
    // console.log(result);
    return { result };
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occured"
    );
  }
}
