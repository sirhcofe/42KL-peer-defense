import React from "react";

type TUserData = {};

type TIntraData = Record<string, string>;

export const UserContext = React.createContext({} as TUserData);

export const UserDataProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [intraData, setIntraData] = React.useState<TIntraData>({});
  const [userKind, setUserKind] = React.useState<string>("");
  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
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
