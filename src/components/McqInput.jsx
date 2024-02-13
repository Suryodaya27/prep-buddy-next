"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import McqQuiz from "./Mcq";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

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
  const [searched, setSearched] = useState(false);
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
        setSearched(true);
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

  // driver.js content
  const driverObj = driver({
    showProgress: true, // Because everyone loves progress bars!
    steps: [
      {
        element: "#input-text",
        popover: {
          title: "Input Text",
          description:
            "Text can be entered here for generating MCQs. You can also select the type of input from the dropdown.",
        },
      },
      {
        element: "#type",
        popover: {
          title: "Type",
          description:
            "Select the type of input from the dropdown. It can be either text or link.",
        },
      },
      {
        element: "#no-of-questions",
        popover: {
          title: "No. of Questions",
          description:
            "Enter the number of questions you want to generate. The maximum number of questions is 5.",
        },
      },
      {
        element: "#use-previous-input",
        popover: {
          title: "Use Previous Input",
          description:
            "Click here to use the previous input text saved in local storage.",
        },
      },
      {
        element: "#submit-button",
        popover: {
          title: "Submit",
          description:
            "Click here to generate MCQs based on the input text and number of questions.",
        },
      },
      {
        popover: {
          title: "After submitting mcqs will popup",
          description:
            " You can assess yourself by clicking correct options and submitting the answers from bottom. Save questions as pdf or save particular question for future references.",
        },
      },
    ],
  });

  // const startDemo = () => {
  //   console.log("mcq input called")
  //   driverObj.drive();
  // };
  function startDemo() {
    driverObj.drive();
  }
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="flex ml-4 justify-start">
          <Button variant="default" onClick={startDemo} className="mt-5 ">
            Start Demo
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md p-4 space-y-4">
          <div className="flex w-full gap-2">
            <Input
              type="text"
              value={inputParagraph}
              onChange={handleInputChange}
              className=" w-3/4 md:w-5/6 border border-gray-300 rounded-md py-5 my-1 px-3 focus:outline-none focus:border-blue-500 bg-white text-black"
              placeholder="Enter Input and please select Type from dropdown"
              id="input-text"
            />
            {/*add drop down for selection of either entering text or link */}
            <Select onValueChange={(e) => setType(e)}>
              <SelectTrigger id="type" className=" my-1 py-5 w-1/4 md:w-1/6">
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
            id="no-of-questions"
          />
          <div className="flex space-x-2 w-full">
            <Button
              variant="outline"
              onClick={handleUsePreviousInput}
              className="flex-grow py-5 my-1 w-2/5"
              disabled={!prevInputToggle}
              id="use-previous-input"
            >
              Use Previous Input
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={disable}
              className="flex-grow py-5 my-1 w-3/5"
              id="submit-button"
            >
              {loading ? "Generating..." : "Submit"}
            </Button>
          </div>
        </div>
        <Separator className="my-5 mx-5 m-auto" />
        {loading && <Loader />}
        {questions.length == 0 && searched && !loading && (
          <div className="text-center mt-5 text-2xl text-gray-500">
            No questions to display , Please try again!!
          </div>
        )}
        {questions.length > 0 && <McqQuiz questions={questions} />}
      </div>
    </div>
  );
};

export default McqInput;
