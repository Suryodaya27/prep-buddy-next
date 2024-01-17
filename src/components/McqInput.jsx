"use client";

import React, { useState} from "react";
import axios from "axios"
import McqQuiz from "./Mcq";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const McqInput = () => {
  const [inputParagraph, setInputParagraph] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <Input
          type="text"
          value={inputParagraph}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full bg-white text-black"
          placeholder="Enter Input Text"
        />
        {/* <input
          type="text"
          value={inputParagraph}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full bg-white text-black"
          placeholder="Enter Input Text"
        /> */}
        <Input
          type="number"
          onChange={(e) => setNoOfQuestions(Math.max(0, parseInt(e.target.value)))}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full bg-white text-black"
          placeholder="Enter No. of Questions" 
        />

        {/* <input
          type="number"
          onChange={(e) => setNoOfQuestions(Math.max(0, parseInt(e.target.value)))}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full bg-white text-black"
          placeholder="Enter No. of Questions"
        /> */}
        <div className="flex space-x-2 w-full">
          {/* <button
            onClick={handleUsePreviousInput}
            className="flex-grow bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Use Previous Input
          </button> */}
          <Button 
            variant="outline"
            onClick={handleUsePreviousInput}
            className="flex-grow"
          >Use Previous Input</Button>
          {/* <button
            disabled={disable}
            onClick={handleSubmit}
            className="flex-grow bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Generating..." : "Submit"}
          </button> */}
          <Button variant="default"
            onClick={handleSubmit}
            disabled={disable}
            className="flex-grow"
          >{loading ? "Generating..." : "Submit"}</Button>

        </div>
      </div>

      {loading && (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 text-black max-w-3xl mx-auto">
          {/* <div className="py-5 font-bold text-2xl text-gray-900"> */}
            <Skeleton
              className="h-[200px] mb-8 p-6 bg-gray-100"
            />
            <Skeleton
              className="h-[200px] mb-8 p-6 bg-gray-100"
            />
            <Skeleton
              className="h-[200px] mb-8 p-6 bg-gray-100"
            />
          {/* </div> */}
        </div>
      )}

      {questions.length > 0 && <McqQuiz questions={questions} />}
    </div>
  );
};

export default McqInput;
