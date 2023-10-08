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

import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { relative } from "path";
import React from "react";
import { useStudentContext } from "@/hooks/dataProvider/StudentDataProvider";

// sort 0 = ascending, 1 = descending
// days can be -1 to prevent filtering
function filterByDays(data, days, sort) {
  let filtered = data;
  if (days !== -1) {
    filtered = data.filter((student) => {
      return (
        student["days_till_blockhole"] <= days &&
        !student["name"].includes("GUEST")
      );
    });
  }
  if (sort === 1) {
    return filtered.sort(
      (a, b) => b["days_till_blockhole"] - a["days_till_blockhole"],
    );
  } else {
    return filtered.sort(
      (a, b) => a["days_till_blockhole"] - b["days_till_blockhole"],
    );
  }
}

const CriticalDays = () => {
  const [displayList, setDisplayList] = React.useState<
    Record<string, string>[]
  >([]);
  const [toggle, setToggle] = React.useState<boolean>(true);
  const { criticalDays } = useStudentContext();
  React.useEffect(() => {
    if (criticalDays.length > 0)
      setDisplayList(filterByDays(criticalDays, 30, 0));
  }, []);
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
            onChange={(e) => {
              setDisplayList(filterByDays(criticalDays, e.target.value, 0));
            }}
          />
        </InputGroup>

        <Text>Total Students: {displayList.length}</Text>
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
              <Th
                isNumeric
                onClick={() => {
                  if (!toggle) setDisplayList(filterByDays(displayList, -1, 0));
                  else setDisplayList(filterByDays(displayList, -1, 1));
                  setToggle(!toggle);
                }}
              >
                Blackhole Left{" "}
                {toggle ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Th>
              <Th>Mark</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayList.map((student, i) => {
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

export default CriticalDays;
