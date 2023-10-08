"use client";

import React from "react";
import { Image, Heading, Text, Button, Stack } from "@chakra-ui/react";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const { imageURL, displayName, intraId } = useUserContext();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-between p-24 ">
      <Text fontSize={"24px"} m={"10"}>
        Hello {displayName},
      </Text>
      {/* <Text fontSize={"24px"}>Login: {intraId}</Text> */}
      <Stack spacing={4} align={"center"}>
        <Button
          width={"full"}
          colorScheme="teal"
          onClick={() => router.push("rush-timeslot")}
        >
          Register Rush Evaluation
        </Button>
        <Button width={"full"}>Submit Evaluation</Button>
      </Stack>
    </main>
  );
}
