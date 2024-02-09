"use client";

import {  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./ui/card";

function SavedQuestions({results}) {
// console.log(results)
  return (
    <div className="py-5 mx-auto">
      {results?.map((result) => {
        return (
          <Card key={result.id} className="flex flex-col mx-3 my-3 lg:w-[900px]  ">
            <CardHeader>
              <CardTitle>{result.question}</CardTitle>
              <CardDescription>Answer: {result.answer}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  )
}

export default SavedQuestions
