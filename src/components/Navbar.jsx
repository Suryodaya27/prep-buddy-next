"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "./ui/separator";

import { cn } from "@/lib/utils";

import { DropMenu } from "./DropMenu";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center">
      <div className="md:flex p-5 ">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold text-black sm:inline-block">
            Prep-buddy
          </span>
        </Link>
        <nav className="flex items-center justify-between gap-6 text-sm">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Generate Mcq
          </Link>

          <Link
            href="/saved_questions"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/saved_questions"
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Saved Questions
          </Link>
          <div className="flex-grow">
            <DropMenu />
          </div>
        </nav>
      </div>
      <Separator />
    </div>
  );
}
