"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Separator } from "./ui/separator"

// import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center">
    <div className="md:flex p-5 ">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <span className="hidden font-bold sm:inline-block">
          Prep-buddy
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Generate Mcq
        </Link>
        
        <Link
          href="/saved_questions"
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          Saved Questions
        </Link>
      </nav>
      </div>
      <Separator className="hidden lg:block" />

      
    </div>
  )
}