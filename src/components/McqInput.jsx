"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import McqQuiz from "./Mcq";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loader from "./Loader";
import useTimer from "@/app/hooks/useTimer";

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
  const [pdfFile, setPdfFile] = useState(null);
  const { seconds, running, startTimer, stopTimer, resetTimer } = useTimer();

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

  const handleFileUpload = async (event) => {
    setPdfFile(event.target.files[0]);
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const parsedData = await axios.post("/api/parse", formData);
      // console.log(parsedData)
      if (parsedData.status === 200) {
        setInputParagraph(parsedData.data.text);
      }
    } catch (error) {
      console.log(error);
    }
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
        startTimer();
        console.log(seconds);
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
        element: "#type",
        popover: {
          title: "Type",
          description:
            "Select the type of input from the dropdown. It can be either text, link or pdf.",
        },
      },
      {
        element: "#input-text",
        popover: {
          title: "Input Text",
          description:
            "Text can be entered here for generating MCQs. If you select link, then enter the link here. If you select pdf, then upload the pdf file here.",
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
        element: "#reset",
        popover: {
          title: "Reset",
          description: "Click here to reset the input fields and start over.",
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

  function startDemo() {
    driverObj.drive();
  }

  // adding reset button functionality
  const reset = () => {
    setLoading(false);
    setInputParagraph("");
    // setNoOfQuestions(0);
    setQuestions([]);
    setDisable(false);
    setSearched(false);
    setPrevInputToggle(false);
    const previousInput = localStorage.getItem("previousInput");
    if (previousInput) {
      setPrevInput(previousInput);
      setPrevInputToggle(true);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="flex ml-4 justify-between mr-4">
          <Button variant="default" onClick={startDemo} className="mt-5 ">
            Start Demo
          </Button>
          <Button
            id="reset"
            variant="destructive"
            onClick={reset}
            className="mt-5 ml-5"
          >
            Reset
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md p-4 space-y-4">
          <div className="flex w-full gap-2">
            {/*add drop down for selection of either entering text or link */}
            <Select onValueChange={(e) => setType(e)}>
              <SelectTrigger id="type" className=" my-1 py-5 w-1/4 md:w-1/6">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Text">Text</SelectItem>
                <SelectItem value="Link">Link</SelectItem>
                <SelectItem value="Pdf">Pdf</SelectItem>
              </SelectContent>
            </Select>
            {
              (type == "Text") && (
                <Textarea
                  value={inputParagraph}
                  onChange={handleInputChange}
                  className=" w-3/4 md:w-5/6 border border-gray-300 rounded-md py-5 my-1 px-3 focus:outline-none focus:border-blue-500 bg-white text-black"
                  placeholder="Enter Data..."
                  id="input-text"
                />
              )
            }
            {( type == "Link") && (
              <Input
                type="text"
                value={inputParagraph}
                onChange={handleInputChange}
                className=" w-3/4 md:w-5/6 border border-gray-300 rounded-md py-5 my-1 px-3 focus:outline-none focus:border-blue-500 bg-white text-black"
                placeholder="Enter url..."
                id="input-text"
              />
            )}
            {type == "Pdf" && (
              <Input
                type="file"
                onChange={handleFileUpload}
                className=" w-3/4 md:w-5/6 border border-gray-300 rounded-md py-5 my-1 px-3 focus:outline-none focus:border-blue-500 bg-white text-black"
                placeholder=""
                id="input-text"
              />
            )}
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
        {questions.length > 0 && <McqQuiz questions={questions} seconds={seconds} stopTimer={stopTimer} resetTimer={resetTimer}/>}
      </div>
    </div>
  );
};

export default McqInput;
