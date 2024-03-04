const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { ApiError } from "@/lib/apiError";
const JWT_SECRET = "suryodayapandey";
const jwt = require("jsonwebtoken");

async function getFromDatabase(token) {
  
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    // console.log(decodedToken);
    const userId = decodedToken.userId;
    const result = await prisma.quizes.findMany({
      where: {
        userId: userId,
      },
      include: { questions: true }
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

export default async function getQuizes(token) {
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
