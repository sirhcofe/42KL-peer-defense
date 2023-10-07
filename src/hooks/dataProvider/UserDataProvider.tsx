"use client";

import React from "react";
import { getCookies } from "@/serverActions/getCookies";
import { urlConfig } from "@/uiConfig/intraConfig";
import axios from "axios";

type UserDataT = {
  accessToken: string;
  setAccessToken: (data: string) => void;
  intraData: IntraDataT;
  setIntraData: (data: IntraDataT) => void;
  userKind: string;
  setUserKind: (data: string) => void;
  intraId: string;
  setIntraId: (value: string) => void;
  displayName: string;
  setDisplayName: (value: string) => void;
  imageURL: string;
  setImageURL: (value: string) => void;
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
  const [intraId, setIntraId] = React.useState<string>("");
  const [displayName, setDisplayName] = React.useState<string>("");
  const [imageURL, setImageURL] = React.useState<string>("");

  React.useEffect(() => {
    getCookies("access_token").then((value) => {
      setAccessToken(value);
      axios.get(`${urlConfig.meURL}?access_token=${value}`).then((response) => {
        const data = response.data;
        setIntraData(data);
        setIntraId(data.login);
        setDisplayName(data.displayname);
        setImageURL(data.image?.versions?.medium);
      });
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        intraData,
        setIntraData,
        userKind,
        setUserKind,
        intraId,
        setIntraId,
        displayName,
        setDisplayName,
        imageURL,
        setImageURL,
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
