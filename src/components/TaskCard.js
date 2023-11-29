import {
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  CardBody,
  CardFooter,
  Badge,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";

import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassEnd,
  faHourglassHalf,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { LOW_PRIORITY, MEDIUM_PRIORITY } from "../utils/constant.utils";

const TaskCard = ({ task, setEditTask, onOpen, removeTask, completeTask }) => {
  return (
    <Card style={{ borderRadius: "20px" }}>
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {task.is_completed ? (
              <IconButton
                variant="solid"
                colorScheme="green"
                aria-label="completed"
                fontSize={"20px"}
                isRound={true}
                icon={<CheckIcon />}
              />
            ) : moment(task.due_date).isAfter(new Date()) ? (
              <IconButton
                variant="solid"
                colorScheme="yellow"
                aria-label="completed"
                fontSize={"20px"}
                isRound={true}
                icon={<FontAwesomeIcon icon={faHourglassHalf} color="white" />}
              />
            ) : (
              <IconButton
                variant="solid"
                colorScheme="red"
                aria-label="completed"
                fontSize={"20px"}
                isRound={true}
                icon={<FontAwesomeIcon icon={faHourglassEnd} />}
              />
            )}

            <Box>
              <Heading size="sm">
                {task.title}{" "}
                <Badge
                  ml="1"
                  colorScheme={
                    task.priority === LOW_PRIORITY
                      ? "blue"
                      : task.priority === MEDIUM_PRIORITY
                      ? "yellow"
                      : "green"
                  }
                >
                  {task.priority}
                </Badge>
              </Heading>
              <Text>{moment(task.due_date).format("DD MMM hh:mm a")}</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="red"
            aria-label="delete"
            fontSize={"20px"}
            isRound={true}
            icon={<DeleteIcon />}
            onClick={() => {
              removeTask(task.id);
            }}
          />
          {!task.is_completed ? (
            <>
              <IconButton
                variant="ghost"
                colorScheme="grey"
                aria-label="delete"
                fontSize={"20px"}
                isRound={true}
                icon={<EditIcon />}
                onClick={() => {
                  setEditTask(task);
                  onOpen();
                }}
              />
              <IconButton
                variant="ghost"
                colorScheme="green"
                aria-label="delete"
                isRound={true}
                icon={<FontAwesomeIcon icon={faSquareCheck} fontSize={25} />}
                onClick={() => {
                  completeTask(task.id);
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Flex>
      </CardHeader>
      <CardBody style={{ padding: "0 25px" }}>
        <Text>{task.description}</Text>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      ></CardFooter>
    </Card>
  );
};

export default TaskCard;
