import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
import { ApiError } from '@/lib/apiError';

// Define the signup controller function
export default async function signupController(email, password) {
    try {
        // Perform necessary validation on the input data
        if (!email || !password) {
            // const error = new Error("All fields are required");
            // error.statusCode = 400; // Bad Request
            // throw error;
            throw new ApiError(400,"All fields are required")   
        }

        // Check if the user already exists in the database
        const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
        if (existingUserByEmail) {
            
            throw new ApiError(409,"User with email already exists")
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the provided username, email, and hashed password
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // Return a response indicating successful signup
        return { message: 'Signup successful', user: newUser };
    } catch (error) {
        // console.log(error)
        throw new ApiError(error.statusCode||  500,error.message||'some error occured')
    }
};
