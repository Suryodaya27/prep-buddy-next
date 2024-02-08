"use client"

import { useState } from "react";

import { MainNav } from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
export default function SavedQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const saveQuestion = async ()=>{
    console.log("saveQuestion");
    console.log(question,answer);
   axios.post("/api/saveQuestion",{question,answer}).then((res)=>{
    console.log(res);
   }
    ).catch((e)=>{
      console.log(e);
    })
  }
  return (
    <div className="flex flex-col">
      <MainNav />
      <h1 className="text-xl text-center mt-5">Feature soon to be added ...</h1>
      {/* <TabsDemo/> */}
      <Drawer>
        <DrawerTrigger className="my-5"><Button variant="outline">Previous inputs</Button></DrawerTrigger>
        <DrawerContent className="h-[400px]">
          <DrawerHeader>
            <DrawerTitle className="text-center mb-3">Previously input texts</DrawerTitle>
            <DrawerDescription className="flex justify-center">
              <ScrollArea className="h-[200px] w-[350px] lg:w-[800px] rounded-md border p-4">
                Texts will appear here...
              </ScrollArea>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="mb-10">
            {/* <Button className="w-[100px] m-auto">Submit</Button> */}
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="flex justify-center">
        <Input onChange={(e)=>setQuestion(e.target.value)} className="w-[100px] lg:w-[300px] mt-5" placeholder="Enter your question here" />
        <Input onChange={(e)=>setAnswer(e.target.value)} className="w-[100px] lg:w-[300px] mt-5" placeholder="Enter your answer here" />
        <Button className="mt-5" onClick={saveQuestion}>Save</Button>
        </div>
    </div>
  );
}
