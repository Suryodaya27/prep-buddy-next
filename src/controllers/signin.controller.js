const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { ApiError } from '@/lib/apiError';

const prisma = new PrismaClient();
const JWT_SECRET = "suryodayapandey";
 export default async function signinController(email, password) {
    try {

        // Check if email or username is provided
        if (!email) {
            // throw new Error('Email or username is required');
            throw new ApiError(400,"Email or username is required")
        }

        // Find the user by email
        const userByEmail = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // Check if user exists
        if (!userByEmail ) {
            // throw new Error('User not found');
            throw new ApiError(404,"User not found")
        }

        // Compare the provided password with the hashed password
        const user = userByEmail;
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Check if password is valid
        if (!isPasswordValid) {
            // throw new Error('Invalid password');
            throw new ApiError(401,"Invalid password")
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        // Return the token
        return { statusCode: 200, message: 'Login successful', token };
    } catch (error) {
        // throw new Error(error.message);
        throw new ApiError(error.statusCode||  500,error.message||'some error occured')
    }
};

