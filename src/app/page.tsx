"use client";

import React from "react";
import { Image, Heading, Text } from "@chakra-ui/react";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";

export default function Home() {
  const { intraData } = useUserContext();

  return (
    <main className="flex flex-col items-center justify-between p-24 w-full">
      <Heading as="h1" fontSize={"4xl"} mb={"42px"}>
        The best dashboard for bocal
      </Heading>
      <Image
        src={intraData.image?.versions?.medium}
        alt={intraData.displayname}
      />
      <Text fontSize={"24px"} mt={"42px"}>
        You are: {intraData.displayname}
      </Text>
      <Text fontSize={"24px"}>Login: {intraData.login}</Text>
    </main>
  );
}
