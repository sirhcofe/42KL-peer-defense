"use client";

import React from "react";

type TUserData = {
  accessToken: string;
  setAccessToken: (data: string) => void;
  intraData: IntraDataT;
  setIntraData: (data: IntraDataT) => void;
  userKind: string;
  setUserKind: (data: string) => void;
};

export type IntraDataT = Record<string, string>;

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

export const UserContext = React.createContext({} as TUserData);

export const useUserContext = () => {
  const userData = React.useContext(UserContext);

  return userData;
};
