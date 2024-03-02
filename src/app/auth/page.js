"use client";

import { TabsDemo } from "@/components/Auth";
import React from "react";

function page() {
  return (
    <div className="flex justify-center items-center flex-col gap-5 mt-20">
      <div className="text-center">
        <h1>Welcome to Prep-buddy</h1>
      </div>

      <div>
        <TabsDemo />
      </div>
    </div>
  );
}

export default page;
