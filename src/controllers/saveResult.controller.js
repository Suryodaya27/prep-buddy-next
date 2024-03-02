const JWT_SECRET = "suryodayapandey";
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { ApiError } from "@/lib/apiError";

async function saveToDatabase(score,total,time, token) {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    // console.log(decodedToken);
    const userId = decodedToken.userId;
    
    
    const result = await prisma.result.create({
      data: {
        score,
        total,
        time,
        userId,
      },
    });
    // console.log(result);
    return result;
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occurred"
    );
  }
}

export default async function saveResult(score,total,time, token) {
  // console.log("saveQuestion");
  // console.log(question, answer, token);
  try {
    const result = await saveToDatabase(score,total,time , token);
    // console.log(result);
    return { result };
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occured"
    );
  }
}
