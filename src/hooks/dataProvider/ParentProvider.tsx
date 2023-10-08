import React from "react";
import { UserDataProvider } from "./UserDataProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { StudentDataProvider } from "./StudentDataProvider";
const ParentProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <UserDataProvider>
        <StudentDataProvider>{children}</StudentDataProvider>
      </UserDataProvider>
    </ChakraProvider>
  );
};

export default ParentProvider;
