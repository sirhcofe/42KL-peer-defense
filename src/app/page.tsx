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
  const { accessToken, setAccessToken, setIntraData } = useUserContext();
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      MAIN PAGE {accessToken}
    </main>
  );
}
