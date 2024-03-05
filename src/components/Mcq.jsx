"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "driver.js/dist/driver.css";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  PlusCircledIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const McqQuiz = ({ questions, seconds, stopTimer, resetTimer }) => {
  const { toast } = useToast();

  const length = questions.length;

  const answers = Array(length).fill("");
  const save = Array(length).fill("Save");
  const [savedQuestions, setSavedQuestions] = useState(save);
  const [selectedAnswer, setSelectedAnswer] = useState(answers);
  const [score, setScore] = useState(0);
  const [toggleScore, setToggleScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [time, setTime] = useState(0);
  const scoreRef = useRef(null);
  const [quizTitles, setQuizTitles] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [createQuizLoading, setCreateQuizLoading] = useState(false);

  const getQuiz = async () => {
    try {
      setQuizLoading(true);
      const response = await axios.get("/api/getQuiz");
      if (response.status === 200) {
        console.log(response.data);
        setQuizTitles(response.data);
        setQuizLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    if (!answered) {
      const updatedAnswers = [...selectedAnswer];
      updatedAnswers[questionIndex] = optionIndex;
      setSelectedAnswer(updatedAnswers);
    }
  };

  const handleSaveResult = async (score, total, time) => {
    try {
      console.log(score, total, time);
      const response = await axios.post("/api/saveResult", {
        score,
        total,
        time,
      });

      if (response.status === 201) {
        toast({
          title: "Result saved successfully!!",
          description: "View result in your profile.",
        });
      } else {
      }
    } catch (error) {
      throw error;
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
        });
      } else {
        // Handle error case
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!answered) {
      let newScore = 0;
      for (let i = 0; i < length; i++) {
        if (questions[i].options[selectedAnswer[i]] === questions[i].answer) {
          newScore++;
        }
      }
      let time = seconds;
      stopTimer();
      setTime(seconds);
      setScore(newScore);
      setToggleScore(true);
      setAnswered(true);
      await handleSaveResult(newScore, length, time);
      resetTimer();
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

  const handleSaveQuestionToQuiz = (quizId, question, answer) => async () => {
    try {
      const response = await axios.post("/api/saveQuestionToQuiz", {
        quizId,
        question,
        answer,
      });
      if (response.status === 201) {
        toast({
          title: "Question saved to quiz successfully!!",
          description: "View question in your Quizes.",
        });
      }
    } catch (error) {}
    console.log(quizId);
  };

  const handleCreateQuiz = async () => {
    try {
      setCreateQuizLoading(true);
      const response = await axios.post("/api/createQuiz", {
        title: quizTitle,
      });
      if (response.status === 201) {
        setCreateQuizLoading(false);
        getQuiz();
        setQuizTitle("");
      }
    } catch (error) {
      console.error(error);
    }
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
            <p className=" text-lg">
              Time taken: <span className="text-green-500">{time}</span> seconds
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
            <div className="flex flex-row justify-between items-center">
              <p className=" font-medium mb-2 font-sans text-lg">
                {element.question}
              </p>
              <div className="flex gap-1 items-center">
                <div>
                  <Sheet>
                    <SheetTrigger>
                      <Button size="sm" variant="icon" onClick={getQuiz}>
                        <PlusCircledIcon />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Your quizes</SheetTitle>

                        <SheetDescription>
                          {quizLoading && <p>Loading...</p>}
                          {!quizLoading && quizTitles.length === 0 && (
                            <p>No quiz found</p>
                          )}
                          {!quizLoading &&
                            quizTitles.length > 0 &&
                            quizTitles.map((quiz, index) => (
                              <div
                                key={index}
                                className="cursor-pointer my-2 p-3 bg-slate-200 font-medium rounded-md text-black"
                                onClick={handleSaveQuestionToQuiz(
                                  quiz.id,
                                  element.question,
                                  element.answer
                                )}
                              >
                                {quiz.title}
                              </div>
                            ))}
                        </SheetDescription>
                      </SheetHeader>
                      <SheetFooter>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Create new</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>create new quiz</DialogTitle>
                              <DialogDescription>
                                Enter title of the quiz and click on create
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="">
                                <Label htmlFor="name" className="text-right">
                                  Title
                                </Label>
                                <Input
                                  id="name"
                                  type="text"
                                  placeholder="Title"
                                  value={quizTitle}
                                  onChange={(e) => setQuizTitle(e.target.value)}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={handleCreateQuiz}
                                disabled={createQuizLoading}
                              >
                                {createQuizLoading ? "Loading" : "Create"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>

                <Button
                  variant="icon"
                  onClick={() =>
                    handleSaveQuestion(
                      element.question,
                      element.answer,
                      element.id
                    )
                  }
                >
                  {savedQuestions[element.id - 1] === "Save" ? (
                    <BookmarkIcon />
                  ) : (
                    <BookmarkFilledIcon />
                  )}
                </Button>
              </div>
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
