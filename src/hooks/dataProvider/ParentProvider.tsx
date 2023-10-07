import React from "react";
import { UserDataProvider } from "./UserDataProvider";

const ParentProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserDataProvider>{children}</UserDataProvider>;
};

export default ParentProvider;
