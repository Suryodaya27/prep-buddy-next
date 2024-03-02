const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { ApiError } from "@/lib/apiError";
const JWT_SECRET = "suryodayapandey";
const jwt = require("jsonwebtoken");

async function getFromDatabase(token) {
  
  try {
    let totalScore=0;
    let totalQuestions=0;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    // console.log(decodedToken);
    const userId = decodedToken.userId;
    const result = await prisma.result.findMany({
      where: {
        userId: userId,
      },
    });
    // sort result on basis of createdAt , latest first
    result.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    // add totalQuestions and totalScores and send in result object
    result.forEach((element) => {
      totalScore+=element.score;
      totalQuestions+=element.total;
    });

    // console.log(result);
    return result;
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occured"
    );
  } 
}

export default async function getResults(token) {
  try {
    const result = await getFromDatabase(token);
    return { result };
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occured"
    );
  }
}
