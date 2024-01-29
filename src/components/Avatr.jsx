import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Avatr() {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
}
