"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {  Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";

export default function quiz() {

  const [quiz, setQuiz] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [createQuizLoading, setCreateQuizLoading] = useState(false);

  const getQuiz = async () => {
    try {
      setQuizLoading(true);
      const response = await axios.get("/api/getQuiz");
      if (response.status === 200) {
        console.log(response.data);
        setQuiz(response.data);
        setQuizLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleSubmit = async () => {
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
    <div className="scroll-smooth">
      <div className="flex flex-col items-center p-10 mx-auto">
        <div className="flex gap-10 items-center">
          <h1>Quizes</h1>
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
                <Button onClick={handleSubmit} disabled={createQuizLoading}>
                  {createQuizLoading ? "Loading" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {quizLoading && <p className="p-5">Loading...</p>}
        <Accordion
          type="single"
          collapsible
          className=" p-10 w-[400px] lg:w-[800px]"
        >
          {quiz.map((q) => {
            return (
              <AccordionItem value={q.id} key={q.id}>
                <AccordionTrigger><h3 className="font-medium text-lg">{q.title}</h3></AccordionTrigger>
                <AccordionContent>
                  {q.questions?.map((result) => {
                    return (
                      <Card
                        key={result.id}
                        className="flex flex-col mx-3 my-1"
                      >
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>{result.question}</CardTitle>

                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleDelete(result.id)}
                            >
                              <TrashIcon />
                            </Button>
                          </div>

                          <CardDescription>
                            Answer: {result.answer}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
