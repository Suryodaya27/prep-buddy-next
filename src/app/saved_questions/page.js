import { MainNav } from "@/components/Navbar";
import draw from "@/components/draw";

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

export default function SavedQuestion() {
  return (
    <div className="flex flex-col">
        <MainNav/>
    <h1 className="text-xl text-center mt-5">Feature soon to be added ...</h1>
    <Drawer>
        <DrawerTrigger>Previous inputs</DrawerTrigger>
        <DrawerContent className="h-[400px]">
          <DrawerHeader>
            <DrawerTitle>Previously input texts</DrawerTitle>
            <DrawerDescription>All Previously used inputs will appear here...</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="mb-10">
            {/* <Button className="w-[100px] m-auto">Submit</Button> */}
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
