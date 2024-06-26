import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
// import redis from '@/lib/redis';
// const MODEL_NAME = process.env.MODEL_NAME;
// const API_KEY = process.env.API_KEY;

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyDHy7OwLjyeqv7G3-KZ2QDMZ95FqOXeoJ0";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

// Fisher-Yates shuffle algorithm to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function generateRephrasedOutput(para) {
  // // find if rephrased output for para is present in redis cache or not
  // const res = await redis.get(para);

  // if(res){
  //   console.log('rephrased output from redis cache')
  //   // console.log(res)
  //   return res;
  // }
  // const prompt = `Given paragraph ${para}, rephrase the paragraph and return as string and no extra characters or format. There should only be theory , no questions ,titles or subtitles.`;
  const prompt = `Given the input data: ${para}, please rephrase the content and return it as a plain string. The rephrased content should not contain any questions, titles, or subtitles. It should only contain the rephrased text. Please only keep text and remove any extra characters or formatting.`;
  try {
    const result = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });
    const output = JSON.stringify(result[0]?.candidates?.[0]?.output, null, 2);
    // redis.set(para,output)
    // redis.set(para, output, 'EX', 86400);
    // console.log('rephrased output from api : ' , output)
    return output;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function splitSentences(text, noOfQuestions) {
  const sentencePattern = /([.!?])\s+(?=[A-Z])/g;
  const sentences = await text.split(sentencePattern);
  // console.log('sentences:', sentences);
  const shuffledSentences = shuffleArray(
    sentences
      .filter((sentence) => sentence !== ".")
      .map((sentence) => sentence.replace(/"/g, ""))
  );
  // console.log('shuffledSentences:', shuffledSentences);
  if (noOfQuestions < shuffledSentences.length) {
    return shuffledSentences.slice(0, noOfQuestions);
  }
  return shuffledSentences;
}

async function generateSentences(inputParagraph, noOfQuestions) {
  try {
    const output = await generateRephrasedOutput(inputParagraph);
    // console.log(inputParagraph,output)
    const sentences = await splitSentences(output, noOfQuestions);
    return sentences;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function getQuestionAnswer(context) {
  const prompt = `Context: "${context}" from given context please generate question and answer, and return like this "question & answer" just write the question and answer no need for titles and only use one "&" to separate question and answer and not any other special characters and generate short 1-5 words answers only and not simple as well as not same, try to create a unique set of questions and answers`;
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

async function generateOptions(question, answer) {
  // const prompt = `Context: "question :${question} and answer: ${answer} from given question and answer please generate three distractors, all three distractors should be in one line and separated by & and return like this distractor1&distractor2&distractor3 just write the distractors no need for titles and only use one "&" to separate distractors and not any other special characters and length of distractors to be the same as the answer and not simple and all distractors should be unique and not same as answer`;
  const prompt = `Context: "Given the question: ${question} and its answer: ${answer}, please generate three plausible distractors. These distractors should be similar in length and complexity to the answer, unique from each other, and different from the answer. Format the distractors in a single line, separated by a single '&' symbol, like so: distractor1&distractor2&distractor3. Please ensure that only '&' is used for separation and no other special characters are included."`;
  // const prompt = `Context: "Given the question: ${question} and its answer: ${answer}, please generate three plausible distractors. These distractors should be similar in length and complexity to the answer, unique from each other, and different from the answer. Each distractor should be distinct and not repetitive. Format the distractors in a single line, separated by a single '&' symbol, like so: distractor1&distractor2&distractor3. Please ensure that only '&' is used for separation and no other special characters are included."`;
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

async function getMcqQuestionsWithIndex(sentences) {
  const questionAnswer = await Promise.all(
    sentences.map(async (element, index) => {
      const qa = await getQuestionAnswer(element);

      let separator = "?"; // Default separator

      // Check if '&' exists, if not, use '?'
      if (qa.includes("&")) {
        separator = "&";
      }

      const [questionPart, answerPart] = qa.split(separator);
      const question =
        questionPart.replace(/^["']|["']$/g, "").trim() +
        (separator === "?" ? "?" : "");
      const answer = answerPart.replace(/^["']|["']$/g, "").trim();

      return {
        index: index + 1,
        question: question,
        answer: answer,
      };
    })
  );

  return questionAnswer;
}

async function generateDistractorsUsingQuestionAndAnswerWithIndex(
  questionAnswers
) {
  const result = await Promise.all(
    questionAnswers.map(async (element) => {
      const opt = await generateOptions(element.question, element.answer);
      const [opt1, opt2, opt3] = opt.split("&");

      const option1 = opt1.replace(/^["'*]|["'*]$/g, "").trim();
      const option2 = opt2.replace(/^["'*]|["'*]$/g, "").trim();
      const option3 = opt3.replace(/^["'*]|["'*]$/g, "").trim();

      const optionObject = [option1, option2, option3, element.answer];

      shuffleArray(optionObject);

      return {
        id: element.index,
        question: element.question,
        answer: element.answer,
        options: optionObject,
      };
    })
  );

  return result;
}

const generateQuestion = async (inputParagraph, noOfQuestions) => {
  try {
    const sentences = await generateSentences(inputParagraph, noOfQuestions);
    const questionAnswers = await getMcqQuestionsWithIndex(sentences);
    const questionAnswersWithDistractors =
      await generateDistractorsUsingQuestionAndAnswerWithIndex(questionAnswers);

    return questionAnswersWithDistractors;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default async function generate(inputParagraph, noOfQuestions) {
  try {
    // const inputParagraph = req.body.inputParagraph;
    // const noOfQuestions = req.body.noOfQuestions;
    noOfQuestions = parseInt(noOfQuestions);
    // console.log('Input Paragraph:', inputParagraph);
    // console.log('No of Questions:', noOfQuestions);
    // console.log(typeof noOfQuestions)
    const questionsWithDistractors = await generateQuestion(
      inputParagraph,
      noOfQuestions
    );

    return questionsWithDistractors;
  } catch (error) {
    console.error("Error:", error);
  }
}
