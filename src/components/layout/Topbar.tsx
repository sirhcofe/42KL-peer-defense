"use client";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { UserKindT } from "@/hooks/dataProvider/UserDataProvider";
export const Topbar = () => {
  const { displayName, intraId, userKind, setUserKind } = useUserContext();
  const kind: UserKindT[] = ["cadet", "pisciner", "bocal"];
  return (
    <div className="w-full flex justify-center">
      <div className="w-11/12 mt-3 p-4 px-6 bg-teal-500 rounded-xl flex justify-end absolute items-center">
        <p className="mr-auto">The Best Dashboard for the bocal</p>
        <p className="mr-4">{`${displayName} | ${intraId}`}</p>
        <Menu>
          <MenuButton
            colorScheme="teal"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {userKind}
          </MenuButton>
          <MenuList>
            {kind
              .filter((i) => i !== userKind)
              .map((ele, i) => (
                <MenuItem key={i} onClick={() => setUserKind(ele)}>
                  {ele}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
