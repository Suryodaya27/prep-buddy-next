'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatr } from "./Avatr"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function DropMenu() {
    const router = useRouter();
    function handleLogout() {
        Cookies.remove('token');
        window.location.reload();
    }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatr />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
