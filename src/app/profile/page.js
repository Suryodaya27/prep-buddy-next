"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Profile() {
  const [userResult, setUserResult] = useState([]);
  const [totalScore, setTotalSCore] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);

  const getResult = async () => {
    try {
      const response = await axios.get("/api/savedResult");
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        setUserResult(response.data);
      }
      // console.log(response.data.result.result)
      console.log("result: ", userResult);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  
  // Render data...
  return (
    <div>
      {/* <div className=" m-5 text-right">
        <button onClick={getResult} ><ReloadIcon/></button>
      </div> */}
        {/* <div>
          <h3>Results:</h3>
          <ul>
            {userResult &&
              userResult.map((element, index) => {
                return (
                  <li key={index}>
                    <h4>Score: {element.score}</h4>
                    <h4>Total Questions: {element.total}</h4>
                    <h4>Date: {element.createdAt}</h4>
                  </li>
                );
              })}
          </ul>
        </div> */}
        <Table className="lg:w-[1000px] mx-auto">
          <TableCaption>Past tests result</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="lg:w-[250px]">Date</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead className="text-right">Time taken</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {userResult.map((result) => (
          <TableRow key={result.id}>
            <TableCell className="font-medium">{result.createdAt}</TableCell>
            <TableCell>{result.score}</TableCell>
            <TableCell>{result.total}</TableCell>
            <TableCell className="text-right">{result.time}</TableCell>
          </TableRow>
        ))}
          </TableBody>
        </Table>
      </div>
  );
}
