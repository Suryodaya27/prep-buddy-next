"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Button } from "@/components/ui/button";

const McqQuiz = ({ questions }) => {
  const length = questions.length;
  const answers = Array(length).fill("");
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

  return (
    <div className="mt-3 mb-10 bg-gray-50 rounded-xl shadow-md p-6 text-black mx-auto">
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
            <p className=" font-medium mb-2 font-sans text-lg">
              {element.question}
            </p>
            <ul className="ml-6 space-y-2">
              {/* <RadioGroup defaultValue="option-one"> */}
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
        <Button variant="default"
          onClick={handleSubmit}
          className="flex-grow"
          disabled={answered}
        >
          Submit
        </Button>
        

        {toggleScore && (
          <Button variant="outline"
            onClick={() =>
              scoreRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-grow"
          >
            Check Score
          </Button>
          
        )}
        <Button variant="destructive"
          onClick={handleSaveAsPDF}
          className="flex-grow"
        >
          Save as PDF
        </Button>
        
      </div>
    </div>
  );
};

export default McqQuiz;
