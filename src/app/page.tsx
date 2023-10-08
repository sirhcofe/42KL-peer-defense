"use client";

import React from "react";
import { Image, Heading, Text, Button, Stack } from "@chakra-ui/react";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";
import { useRouter } from "next/navigation";
import EvalList from "@/components/eval-form/EvalList";
import { BocalView } from "@/components/BocalView";

export default function Home() {
  const { imageURL, displayName, userKind } = useUserContext();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-between p-24 ">
      <Text fontSize={"24px"} m={"10"}>
        Hello {displayName},
      </Text>
      {userKind === "bocal" ? (
        <BocalView />
      ) : (
        <Stack spacing={4} direction={"row"} align={"center"} width={800}>
          <Button width={"full"} colorScheme="teal">
            {userKind === "cadet" ? "Volunteer" : "Register"} for Rush
            Evaluation
          </Button>
          {userKind === "cadet" && (
            <div>
              <EvalList />
            </div>
          )}
        </Stack>
      )}
    </main>
  );
}
