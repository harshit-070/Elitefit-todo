import { IconButton } from "@chakra-ui/react";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";

const stickButton = {
  position: "fixed",
  bottom: "1rem",
  right: "3rem",
  zIndex: 5000,
};

const AddButton = ({ onOpen }) => {
  return (
    <div style={stickButton}>
      <IconButton
        size={"lg"}
        onClick={onOpen}
        colorScheme="blue"
        icon={<AddIcon />}
        isRound={true}
        variant="solid"
      />
    </div>
  );
};

export default AddButton;
