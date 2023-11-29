import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";
import {
  ALL_PRIORITY,
  DATE_HIGH_TO_LOW,
  DATE_LOW_TO_HIGH,
  HIGH_PRIORITY,
  LOW_PRIORITY,
  MEDIUM_PRIORITY,
  PRIORITY_HIGH_TO_LOW,
  PRIORITY_LOW_TO_HIGH,
} from "../utils/constant.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";

const SearchInput = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      search: "",
      priority: ALL_PRIORITY,
      sort: "",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      search: search,
    });
  };

  const handleChangePriority = (priority) => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      priority: priority,
    });
  };
  const handleChangeSort = (priority) => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      sort: priority,
    });
  };

  return (
    <Flex
      margin={"15px auto"}
      minW={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={5}
      padding={{ base: "10px", md: 0 }}
    >
      <Box minW={{ base: "70%", sm: "70%" }}>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="black" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="eg. Workout"
              value={search}
              borderColor={"black"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                type="submit"
                colorScheme="black"
                backgroundColor={"black"}
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FontAwesomeIcon icon={faFilter} />}
          variant="outline"
          _hover={{ backgroundColor: "white" }}
          _active={{ backgroundColor: "white" }}
        />
        <MenuList>
          <MenuItem disabled>Priority</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => handleChangePriority(ALL_PRIORITY)}>
            All
          </MenuItem>
          <MenuItem onClick={() => handleChangePriority(HIGH_PRIORITY)}>
            High
          </MenuItem>
          <MenuItem onClick={() => handleChangePriority(MEDIUM_PRIORITY)}>
            Medium
          </MenuItem>
          <MenuItem onClick={() => handleChangePriority(LOW_PRIORITY)}>
            Low
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FontAwesomeIcon icon={faSort} />}
          variant="outline"
          _hover={{ backgroundColor: "white" }}
          _active={{ backgroundColor: "white" }}
        />
        <MenuList>
          <MenuItem onClick={() => handleChangeSort(PRIORITY_HIGH_TO_LOW)}>
            Priority: High to Low
          </MenuItem>
          <MenuItem onClick={() => handleChangeSort(PRIORITY_LOW_TO_HIGH)}>
            Priority: Low to High
          </MenuItem>
          <MenuItem onClick={() => handleChangeSort(DATE_HIGH_TO_LOW)}>
            Date: High to Low
          </MenuItem>
          <MenuItem onClick={() => handleChangeSort(DATE_LOW_TO_HIGH)}>
            Date: Low to High
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SearchInput;
