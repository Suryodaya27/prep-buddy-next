"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"
import McqQuiz from "./Mcq";

const McqInput = () => {
  const [inputParagraph, setInputParagraph] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Load previous input text from local storage when the component mounts
  //   const previousInput = localStorage.getItem('previousInput');
  //   if (previousInput) {
  //     setInputParagraph(previousInput);
  //   }
  // }, []);

  const handleInputChange = (event) => {
    setInputParagraph(event.target.value);
  };

  const handleUsePreviousInput = () => {
    // Set input text to the previous input saved in local storage
    const previousInput = localStorage.getItem('previousInput');
    if (previousInput) {
      setInputParagraph(previousInput);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setDisable(true);
      setQuestions([]);
      const response = await axios.post("/api/generate", {
        inputParagraph: inputParagraph,
        noOfQuestions: noOfQuestions,
      });

      if (response.status === 200) {
        setQuestions(response.data.questions);
        setLoading(false);
        setDisable(false);
        // Save the current input text to local storage
        localStorage.setItem('previousInput', inputParagraph);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md p-4 space-y-4">
        <input
          type="text"
          value={inputParagraph}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full bg-white text-black"
          placeholder="Enter Input Text"
        />
        <input
          type="number"
          onChange={(e) => setNoOfQuestions(Math.max(0, parseInt(e.target.value)))}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full bg-white text-black"
          placeholder="Enter No. of Questions"
        />
        <div className="flex space-x-2 w-full">
          <button
            onClick={handleUsePreviousInput}
            className="flex-grow bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Use Previous Input
          </button>
          <button
            disabled={disable}
            onClick={handleSubmit}
            className="flex-grow bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Generating..." : "Submit"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-6">
          <div className="py-5 font-bold text-2xl text-gray-900">
            Generating Questions...
          </div>
        </div>
      )}

      {questions.length > 0 && <McqQuiz questions={questions} />}
    </div>
  );
};

export default McqInput;
