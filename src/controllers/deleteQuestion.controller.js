const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { ApiError } from "@/lib/apiError";

export default async function deleteQuestion(questionId,token) {

  try {
    const result = await prisma.questions.delete({
      where: {
        id: questionId,
      },
    });
    return { result };
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "some error occured"
    );
  }
}
