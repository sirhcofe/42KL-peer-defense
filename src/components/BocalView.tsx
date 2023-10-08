import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  useSafeLayoutEffect,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const BocalView = () => {
  const [lists, setList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/eval-form")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {lists.map((list, i) => {
        return (
          <Card key={i}>
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <p>View a summary of all your customers over the last month.</p>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
