"use client";

import { MainNav } from "@/components/Navbar";
import axios from "axios";

import React, { useEffect, useState } from "react";
import SavedQuestions from "@/components/SavedQuestions";

import { Skeleton } from "@/components/ui/skeleton";

export default function SavedQuestion() {
  const [savedQuestion, setSavedQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noQuestions, setNoQuestions] = useState(false);
  useEffect(() => {
    getSavedQuestions();
  }, []);
  const getSavedQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/savedQuestions");
      console.log(response);
      if (response.status === 200) {
        setSavedQuestion(response.data.result);
        // if(savedQuestion.length===0){
        //   setNoQuestions(true);
        // }
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
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
        <SavedQuestions results={savedQuestion.result} />
      )}
      
    </div>
  );
}
