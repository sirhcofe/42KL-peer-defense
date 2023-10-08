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
} from "@chakra-ui/react";
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
        student["since_last_submission"] >= days &&
        !student["name"].includes("GUEST")
      );
    });
  }
  if (sort === 1) {
    return filtered.sort(
      (a, b) => b["since_last_submission"] - a["since_last_submission"],
    );
  } else {
    return filtered.sort(
      (a, b) => a["since_last_submission"] - b["since_last_submission"],
    );
  }
}

const LastSubmission = () => {
  const [displayList, setDisplayList] = React.useState<
    Record<string, string>[]
  >([]);
  const [toggle, setToggle] = React.useState<boolean>(true);
  const { lastSubmission } = useStudentContext();
  React.useEffect(() => {
    if (lastSubmission.length > 0)
      setDisplayList(filterByDays(lastSubmission, 30, 0));
  }, []);
  return (
    <Box display={"flex"} flexDirection={"column"} gap="32px">
      <Heading ml={"16px"}>Since Last Project Submission</Heading>
      <Text ml={"16px"} alignSelf={"flex-start"}>
        Total Students: {displayList.length}
      </Text>
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
              <Th isNumeric>Since Last Submission</Th>
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
                  <Td isNumeric>{student["since_last_submission"]}</Td>
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

export default LastSubmission;
