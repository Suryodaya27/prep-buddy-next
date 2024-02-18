"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "driver.js/dist/driver.css";
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuIcon } from "@radix-ui/react-icons";

const McqQuiz = ({ questions }) => {
  const { toast } = useToast()
  
  const length = questions.length;
  const answers = Array(length).fill("");
  const save = Array(length).fill("Save");
  const [savedQuestions, setSavedQuestions] = useState(save);
  const [selectedAnswer, setSelectedAnswer] = useState(answers);
  const [score, setScore] = useState(0);
  const [toggleScore, setToggleScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const scoreRef = useRef(null);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    if (!answered) {
      const updatedAnswers = [...selectedAnswer];
      updatedAnswers[questionIndex] = optionIndex;
      setSelectedAnswer(updatedAnswers);
    }
  };

  const handleSaveQuestion = async (question, answer, index) => {
    try {
      // console.log("clicked")
      const response = await axios.post("/api/saveQuestion", {
        question,
        answer,
      });

      if (response.status === 201) {
        const updatedSavedQuestions = [...savedQuestions];
        updatedSavedQuestions[index - 1] = "Saved";
        setSavedQuestions(updatedSavedQuestions);
        toast({
          title: "Question saved successfully!!",
          description: "View question in your saved questions.",
        })
      } else {
        // Handle error case
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = () => {
    if (!answered) {
      let newScore = 0;
      for (let i = 0; i < length; i++) {
        if (questions[i].options[selectedAnswer[i]] === questions[i].answer) {
          newScore++;
        }
      }
      setScore(newScore);
      setToggleScore(true);
      setAnswered(true);

      // Scroll to the top of the page
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const handleSaveAsPDF = () => {
    const contentElement = document.querySelector("#mcq-quiz-content");
    const contentText = contentElement.innerText;

    const pdf = new jsPDF();
    pdf.text(contentText, 10, 10); // Adjust the position as needed
    pdf.save("mcq-quiz.pdf");
  };

  // driver.js content
  // const mcqWorking = driver({
  //   showProgress: true,
  //   steps:[
  //     {
  //       element: '#mcq-quiz-content',
  //       popover: {
  //         title: 'Generated Questions',
  //         description: 'Here are the questions generated from the input text.'
  //       }
  //     },
  //     {
  //       element: '#mcq-quiz-content li:first-child',
  //       popover: {
  //         title: 'Question',
  //         description: 'This is the first question. Select the correct answer and click on the submit button. Save the question to your saved questions.'
  //       }
  //     },
  //     {
  //       element: '#mcq-quiz-submit',
  //       popover: {
  //         title: 'Submit',
  //         description: 'Click on the submit button to submit your answers and check score button will appear.',
  //         position: 'top'
  //       }
  //     },
  //     {
  //       element: '#mcq-quiz-saveAsPdf',
  //       popover: {
  //         title: 'Save as PDF',
  //         description: 'Click on the save as PDF button to save the questions and answers as a PDF.',
  //         position: 'top'
  //       }
  //     }
  //   ]
  // })
  // // const startFunctioning = () => {
  // //   console.log("mcq called")
  // //   mcqWorking.drive();
  // // }
  // function startFunctioning() {
  //   mcqWorking.drive();
  // }

  return (
    <div className="mt-3 mb-10 bg-gray-50 rounded-xl shadow-md p-6 text-black mx-auto">
      {/* <Button variant="default" onClick={startFunctioning} className="mb-4">
        How it works
      </Button> */}
      {toggleScore && (
        <div className="pb-10">
          <div
            ref={scoreRef}
            className="mt-3 bg-white rounded-xl shadow-md px-6 pb-5 pt-6 text-black"
          >
            <h3 className="text-xl font-bold mb-4">Score</h3>
            <p className=" text-lg">
              You scored <span className="text-green-500">{score}</span> out of{" "}
              {length}
            </p>
          </div>
        </div>
      )}

      {/* <h3 className="text-3xl font-bold mb-8">Generated Questions</h3> */}
      <ul id="mcq-quiz-content">
        {questions.map((element, questionIndex) => (
          <li
            key={element.id}
            className="mb-4 p-6 outline-1 bg-white  hover:shadow-lg rounded-lg"
          >
            <div className="flex flex-row justify-between">
              <p className=" font-medium mb-2 font-sans text-lg">
                {element.question}
              </p>
              {/* <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleSaveQuestion(
                    element.question,
                    element.answer,
                    element.id
                  )
                }
                disabled={savedQuestions[element.id - 1] === "Saved"}
              >
                {savedQuestions[element.id - 1]}
              </Button> */}
              {/* dropdown for saving options */}
              <DropdownMenu>
                <DropdownMenuTrigger><DropdownMenuIcon/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Options
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      handleSaveQuestion(
                        element.question,
                        element.answer,
                        element.id
                      )
                    }
                  >
                    {savedQuestions[element.id - 1]}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem>Create Quiz</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ul className="ml-6 space-y-2">
              {element.options.map((option, optionIndex) => (
                <li key={optionIndex} className="mb-2">
                  <label className="cursor-pointer text-black flex font-sans items-center">
                    <input
                      className="mr-2 cursor-pointer aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 checked:bg-gray-600 checked:border-transparent"
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={optionIndex}
                      checked={selectedAnswer[questionIndex] === optionIndex}
                      onChange={() =>
                        handleAnswerChange(questionIndex, optionIndex)
                      }
                      disabled={answered}
                    />
                    <span
                      className={`${
                        answered && option === element.answer
                          ? "text-red-500"
                          : "text-gray-800"
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                </li>
              ))}
              {/* </RadioGroup> */}
            </ul>
          </li>
        ))}
      </ul>
      <div className="flex space-x-4 mt-8 mb-5">
        <Button
          variant="default"
          onClick={handleSubmit}
          className="flex-grow"
          disabled={answered}
          id="mcq-quiz-submit"
        >
          Submit
        </Button>

        {toggleScore && (
          <Button
            variant="outline"
            onClick={() =>
              scoreRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-grow"
          >
            Check Score
          </Button>
        )}
        <Button
          variant="destructive"
          onClick={handleSaveAsPDF}
          className="flex-grow"
          id="mcq-quiz-saveAsPdf"
        >
          Save as PDF
        </Button>
      </div>
    </div>
  );
};

export default McqQuiz;
