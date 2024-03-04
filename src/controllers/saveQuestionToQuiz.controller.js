
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { ApiError } from "@/lib/apiError";

async function saveToDatabase(quizId,question, answer) {
  try {
    
    
    const result = await prisma.quizQuestions.create({
      data: {
        quizId,
        question,
        answer
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

export default async function saveQuestionToQuiz(quizId,question, answer) {
  // console.log("saveQuestion");
  // console.log(question, answer, token);
  try {
    const result = await saveToDatabase(quizId,question, answer);
    // console.log(result);
    return { result };
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occured"
    );
  }
}
