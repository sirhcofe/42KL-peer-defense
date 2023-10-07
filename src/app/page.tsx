"use client";
import Image from "next/image";
import React from "react";
import {
  useUserContext,
  IntraDataT,
} from "@/hooks/dataProvider/UserDataProvider";
import { getCookies, clearCookies } from "@/serverActions/getCookies";
import { urlConfig, envConfig } from "@/uiConfig/intraConfig";

import axios from "axios";
export default function Home() {
  const { accessToken, setAccessToken, intraData, setIntraData } =
    useUserContext();
  React.useEffect(() => {
    getCookies("access_token").then((value) => {
      setAccessToken(value);
      axios.get(`${urlConfig.meURL}?access_token=${value}`).then((response) => {
        console.log(response.data);
        setIntraData(response.data);
      });
    });
  }, []);
  return (
    <main className="flex flex-col items-center justify-between p-24 w-full">
      <h1>The best dashboard for bocal</h1>
      <h3>You are: {intraData.displayname}</h3>
      <h3>Login: {intraData.login}</h3>
    </main>
  );
}
