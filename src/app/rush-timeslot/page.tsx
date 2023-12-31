"use client";

import TimeSlotPicker from "@/components/timeslot/TimeSlotPicker";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useState } from "react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

export default function Home() {
  const [student, setStudent] = useState("cadet");
  return (
    <ChakraProvider theme={theme}>
      <TimeSlotPicker student={student} />
    </ChakraProvider>
  );
}
