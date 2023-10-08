"use client";

import { Image, Box, Heading } from "@chakra-ui/react";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";
import StudentTable from "@/components/student-data/StudentTable";
import LastSubmission from "@/components/student-data/LastSubmission";
const Banana = () => {
  const { imageURL, intraData } = useUserContext();

  if (Object.keys(intraData).length === 0)
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100vw"}
        h={"100vw"}
      >
        <Heading as={"h1"}> Page is loading please wait.</Heading>
      </Box>
    );
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-around"}
      alignItems={"center"}
      gap={"32px"}
    >
      <StudentTable />
      <LastSubmission />
    </Box>
  );
};

export default Banana;
