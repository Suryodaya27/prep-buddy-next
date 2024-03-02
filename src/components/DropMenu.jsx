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
import { PersonIcon } from "@radix-ui/react-icons";

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
          <div className="bg-slate-200 p-3 rounded-full">
            <PersonIcon className=""/>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={navigateToProfile} className="cursor-pointer">My Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
