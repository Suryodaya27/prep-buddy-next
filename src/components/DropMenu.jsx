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
    function navigateToProfile() {
        router.push('/profile');
    }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatr />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel onClick={navigateToProfile}>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
