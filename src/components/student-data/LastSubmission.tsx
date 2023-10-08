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
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useStudentContext } from "@/hooks/dataProvider/StudentDataProvider";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { convertDownload } from "@/utils/filterObject";

// sort 0 = ascending, 1 = descending
// days can be -1 to prevent filtering
function filterByDays(data, days, sort, type) {
  let field = ["since_last_submission", "days_till_blockhole"];
  let filtered = data;
  if (days !== -1) {
    filtered = data.filter((student) => {
      return (
        student["since_last_submission"] >= days &&
        !student["name"].includes("GUEST")
      );
    });
  }
  if (sort) {
    return filtered.sort((a, b) => b[field[type]] - a[field[type]]);
  } else {
    return filtered.sort((a, b) => a[field[type]] - b[field[type]]);
  }
}

const LastSubmission = () => {
  const [displayList, setDisplayList] = React.useState<
    Record<string, string>[]
  >([]);
  const [toggle, setToggle] = React.useState<boolean>(true);
  const [whichToggle, setWhichToggle] = React.useState<number>(0);
  const [days, setDays] = React.useState<number>(30);
  const { lastSubmission, setLastSubmisison } = useStudentContext();

  React.useEffect(() => {
    if (lastSubmission.length > 0)
      setDisplayList(filterByDays(lastSubmission, days, toggle, whichToggle));
  }, [lastSubmission, days, toggle, whichToggle]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap="32px">
      <Heading ml={"16px"}>Since Last Project Submission</Heading>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text>Total Students: {displayList.length}</Text>
        <Box display={"flex"} alignItems={"left"} gap="24px">
          <InputGroup>
            <InputLeftAddon>Filter</InputLeftAddon>
            <Input
              htmlSize={4}
              width="auto"
              type="number"
              placeholder="last submission"
              onChange={(e) => {
                if (e.target.value === "" || Number(e.target.value) <= 0)
                  setDays(30);
                else setDays(Number(e.target.value));
              }}
            />
          </InputGroup>
        </Box>
      </Box>
      <Button
        onClick={() => {
          convertDownload(displayList);
        }}
      >
        Download
      </Button>
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
                  setToggle(!toggle);
                  setWhichToggle(1);
                }}
              >
                Blackhole Left
                {toggle && whichToggle === 1 ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </Th>
              <Th
                isNumeric
                onClick={() => {
                  setToggle(!toggle);
                  setWhichToggle(0);
                }}
              >
                Since Last Submission
                {toggle && whichToggle === 0 ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
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
                  <Td isNumeric>{student["since_last_submission"]}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setLastSubmisison(
                          lastSubmission.filter((data) => {
                            return data["intra_id"] !== student["intra_id"];
                          }),
                        );
                      }}
                    />
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
