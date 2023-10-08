import React from "react";
import { UserDataProvider } from "./UserDataProvider";
import { ChakraProvider } from "@chakra-ui/react";

const ParentProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <UserDataProvider>{children}</UserDataProvider>
    </ChakraProvider>
  );
};

export default ParentProvider;
