import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Heading,
  Text,
  Button,
  Input,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import { relative } from "path";
import React from "react";
import studentData from "src/student-data/sample.json";
let criticalDays = studentData
  .filter((student) => {
    return (
      student["days_till_blockhole"] < 30 && !student["name"].includes("GUEST")
    );
  })
  .sort((a, b) => a["days_till_blockhole"] - b["days_till_blockhole"]);

let sinceLastSubmission = studentData
  .filter((student) => {
    return student["since_last_submission"] > 30;
  })
  .sort((a, b) => b["since_last_submission"] - a["since_last_submission"]);

const StudentTable = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap="32px">
      <Heading ml={"16px"}>Students with Critical Days</Heading>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <InputGroup>
          <InputLeftAddon>Filter</InputLeftAddon>
          <Input
            htmlSize={4}
            width="auto"
            type="number"
            placeholder="blackhole days"
          />
        </InputGroup>

        <Text>Total Students: {criticalDays.length}</Text>
      </Box>
      <Button>Download</Button>
      <TableContainer
        maxHeight={"420px"}
        overflowY={"scroll"}
        paddingRight={"12px"}
        borderRadius={"12px"}
        marginRight={"12px"}
        backgroundColor={"#F8F8F8"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#A9A9A9",
            borderRadius: "24px",
          },
        }}
      >
        <Table>
          <Thead
            position="sticky"
            top={0}
            zIndex="docked"
            backgroundColor={"#F8F8F8"}
          >
            <Tr>
              <Th>Intra</Th>
              <Th>Full Name</Th>
              <Th isNumeric>Blackhole Left</Th>
              <Th>Mark</Th>
            </Tr>
          </Thead>
          <Tbody>
            {criticalDays.map((student, i) => {
              return (
                <Tr key={i}>
                  <Td>{student["intra_id"]}</Td>
                  <Td>{student["name"]}</Td>
                  <Td isNumeric>{student["days_till_blockhole"]}</Td>
                  <Td>
                    <Button />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentTable;
