"use client";

import React from "react";
import { Image, Heading, Text } from "@chakra-ui/react";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";

export default function Home() {
  const { imageURL, displayName, intraId } = useUserContext();

  return (
    <main className="flex flex-col items-center justify-between p-24 w-full">
      <Heading as="h1" fontSize={"4xl"} mb={"42px"}>
        The best dashboard for bocal
      </Heading>
      <Image src={imageURL} alt={displayName} />
      <Text fontSize={"24px"} mt={"42px"}>
        You are: {displayName}
      </Text>
      <Text fontSize={"24px"}>Login: {intraId}</Text>
    </main>
  );
}
