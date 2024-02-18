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
    <div className="flex flex-col">
      <div className="flex p-3 justify-between lg:mx-20">
        <Link href="/" className="flex items-center space-x-2">
          <span className="hidden font-bold text-black sm:inline-block">
            Prep-buddy
          </span>
        </Link>
        <nav className="flex items-center md:justify-between gap-6 md:gap-16 text-sm">   
          <Link
            href="/generate_mcq"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/generate_mcq"
                ? "text-foreground border-b-2 border-foreground/80"
                : "text-foreground/60"
            )}
          >
            Generate Mcq
          </Link>

          <Link
            href="/saved_questions"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/saved_questions"
                ? "text-foreground border-b-2 border-foreground/80"
                : "text-foreground/60"
            )}
          >
            Saved Questions
          </Link>
        </nav>
        <div>
          <DropMenu />
        </div>
      </div>
      <Separator />
    </div>
  );
}
