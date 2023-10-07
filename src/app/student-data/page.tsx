"use client";

import { Image, Box, Heading } from "@chakra-ui/react";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";
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
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"32px"}
    >
      <h1>Here i shall display my banana.</h1>
      <Image src={imageURL} alt="Dan Abramov" />
    </Box>
  );
};

export default Banana;
