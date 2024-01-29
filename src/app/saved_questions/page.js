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
import { TabsDemo } from "@/components/Auth";
export default function SavedQuestion() {
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
    </div>
  );
}
