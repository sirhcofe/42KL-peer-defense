"use client";

import { Image, Box } from "@chakra-ui/react";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";
const Banana = () => {
  const { intraData } = useUserContext();
  return (
    <Box>
      <h1>Here i shall display my banana.</h1>
      <Image src={intraData.image?.versions?.small} alt="Dan Abramov" />
    </Box>
  );
};

export default Banana;
