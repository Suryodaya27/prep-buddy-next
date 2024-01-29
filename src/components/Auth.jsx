import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"

export function TabsDemo() {
  return (
    <Tabs defaultValue="SignIn" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="SignIn">SignIn</TabsTrigger>
        <TabsTrigger value="SignUp">SignUp</TabsTrigger>
      </TabsList>
      <TabsContent value="SignIn">
        <SignIn/>
      </TabsContent>
      <TabsContent value="SignUp">
        <SignUp/>
      </TabsContent>
    </Tabs>
  )
}
