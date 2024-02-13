"use client";

import { MainNav } from "@/components/Navbar";
import axios from "axios";

import React, { useEffect, useState } from "react";
import {  Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavedQuestion() {
  const [savedQuestion, setSavedQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getSavedQuestions();
  }, []);

  const getSavedQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/savedQuestions");
      console.log(response);
      if (response.status === 200) {
        setSavedQuestion(response.data.result.result);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("/api/deleteQuestion", { questionId: id });
      // console.log(response);
      if (response.status === 200) {
        getSavedQuestions()
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      <MainNav />

      {loading ? (
        <div className="py-5 mx-auto">
          <Skeleton className="flex flex-col bg-gray-300 w-[350px] h-[90px] mx-3 my-3 lg:w-[900px] " />
          <Skeleton className="flex flex-col bg-gray-300 w-[350px] h-[90px] mx-3 my-3 lg:w-[900px] " />
          <Skeleton className="flex flex-col bg-gray-300 w-[350px] h-[90px] mx-3 my-3 lg:w-[900px] " />
        </div>
      ) : (
        <div className="py-5 mx-auto">
          {savedQuestion?.map((result) => {
            return (
              <Card
                key={result.id}
                className="flex flex-col mx-3 my-3 lg:w-[900px]  "
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

                  <CardDescription>Answer: {result.answer}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
