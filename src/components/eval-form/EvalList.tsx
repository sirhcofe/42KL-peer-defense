"use client";
import {
  Box,
  Button,
  Heading,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EvalList() {
  const [evals, setEvals] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/matchmake?evaluator=${"jatan"}`)
      .then((res) => {
        console.log(res.data);
        setEvals(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} gap="32px">
      {!evals.length ? (
        <Box>
          <p>No evaluations</p>
        </Box>
      ) : (
        <TableContainer
          maxHeight={"420px"}
          overflowY={"scroll"}
          // paddingRight={"12px"}
          borderRadius={"12px"}
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
                <Th>Team name</Th>
                <Th>Evaluation Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {evals.map((each, i) => {
                const date = new Date(each.dateTime.seconds * 1000);
                return (
                  <Tr key={i}>
                    <Td>{each.teamId}</Td>
                    <Td>
                      {date.toLocaleString("default", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h24",
                      })}
                    </Td>
                    <Td>
                      <Button
                        size={"sm"}
                        onClick={() =>
                          router.push(`/eval-form?teamId=${each.teamId}`)
                        }
                      >
                        Submit Evaluation
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
