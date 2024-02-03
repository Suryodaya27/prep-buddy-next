"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import McqQuiz from "./Mcq";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loader from "./Loader";

const McqInput = () => {
  const [inputParagraph, setInputParagraph] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevInput, setPrevInput] = useState("");
  const [prevInputToggle, setPrevInputToggle] = useState(false);
  const [type, setType] = useState("Text");

  useEffect(() => {
    const previousInput = localStorage.getItem("previousInput");
    if (previousInput) {
      setPrevInput(previousInput);
      setPrevInputToggle(true);
    }
  }, [loading]);

  const handleInputChange = (event) => {
    setInputParagraph(event.target.value);
  };

  const handleUsePreviousInput = () => {
    // Set input text to the previous input saved in local storage
    setInputParagraph(prevInput);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setDisable(true);
      setQuestions([]);
      if (type === "Link") {
        const scrapedData = await axios.post("/api/scrape", {
          url: inputParagraph,
        });
        setInputParagraph(scrapedData.data.scrapedData.scrapedData);
      }
      const response = await axios.post("/api/generate", {
        inputParagraph: inputParagraph,
        noOfQuestions: noOfQuestions,
      });

      if (response.status === 200) {
        setQuestions(response.data.questions);
        setLoading(false);
        setDisable(false);
        // Save the current input text to local storage
        localStorage.setItem("previousInput", inputParagraph);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-5">
      <div className="flex flex-col items-center justify-center rounded-md p-4 space-y-4">
        <div className="flex w-full gap-2">
          <Input
            type="text"
            value={inputParagraph}
            onChange={handleInputChange}
            className=" w-3/4 md:w-5/6 border border-gray-300 rounded-md py-5 my-1 px-3 focus:outline-none focus:border-blue-500 bg-white text-black"
            placeholder="Enter Input and please select Type from dropdown"
          />
          {/*add drop down for selection of either entering text or link */}
          <Select onValueChange={(e) => setType(e)}>
            <SelectTrigger className="my-1 py-5 w-1/4 md:w-1/6">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="Link">Link</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          type="number"
          onChange={(e) =>
            setNoOfQuestions(Math.min(5, parseInt(e.target.value)))
          }
          className="border border-gray-300 rounded-md py-5 my-1 px-3 focus:outline-none focus:border-blue-500 w-full bg-white text-black"
          placeholder="Enter No. of Questions (Max 5)"
        />
        <div className="flex space-x-2 w-full">
          <Button
            variant="outline"
            onClick={handleUsePreviousInput}
            className="flex-grow py-5 my-1"
            disabled={!prevInputToggle}
          >
            Use Previous Input
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={disable}
            className="flex-grow py-5 my-1"
          >
            {loading ? "Generating..." : "Submit"}
          </Button>
        </div>
      </div>
      <Separator className="my-5 mx-5 m-auto" />
      {loading && <Loader />}

      {questions.length > 0 && <McqQuiz questions={questions} />}
    </div>
  );
};

export default McqInput;
