"use client";

import React from "react";

type UserDataT = {
  accessToken: string;
  setAccessToken: (data: string) => void;
  intraData: IntraDataT;
  setIntraData: (data: IntraDataT) => void;
  userKind: string;
  setUserKind: (data: string) => void;
};

export type IntraDataT = Record<string, string>;

export const UserContext = React.createContext({} as UserDataT);

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [intraData, setIntraData] = React.useState<IntraDataT>({});
  const [userKind, setUserKind] = React.useState<string>("");
  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        intraData,
        setIntraData,
        userKind,
        setUserKind,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userData = React.useContext(UserContext);

  return userData;
};
