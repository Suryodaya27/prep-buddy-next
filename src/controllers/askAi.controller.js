import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';


const MODEL_NAME = 'models/text-bison-001';
const API_KEY = 'AIzaSyDHy7OwLjyeqv7G3-KZ2QDMZ95FqOXeoJ0';

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function generateResult(question,answer) {
    const prompt = `Given the question: ${question} ans answer: ${answer}, please justify why the answer is correct. The justification should be short crsip and to the point`;
    try {
        const result = await client.generateText({
        model: MODEL_NAME,
        prompt: {
            text: prompt,
        },
        });
        const output = JSON.stringify(result[0]?.candidates?.[0]?.output, null, 2);
        return output;
    } catch (error) {
        console.error(error);
        return null;
    }
    }


export default async function askAi(question,answer) {
    try {
      const result = await generateResult(question,answer);
  
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  }