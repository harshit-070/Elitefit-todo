import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import {
  HIGH_PRIORITY,
  LOW_PRIORITY,
  MEDIUM_PRIORITY,
} from "../utils/constant.utils";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { toastError, toastSuccess } from "../utils/toast.utils";
const TaskModal = ({
  isOpen,
  handleModalClose,
  editTask,
  addTaskInList,
  updateTaskInList,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(moment().add("5", "hours"));
  const [priority, setPriority] = useState(HIGH_PRIORITY);

  const init = () => {
    setTitle("");
    setDescription("");
    setDueDate(moment().add("5", "hours"));
    setPriority(HIGH_PRIORITY);
  };

  useEffect(() => {
    if (Object.keys(editTask).length === 0) {
      setIsEdit(false);
      init();
    } else {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDueDate(moment(editTask.due_date));
      setPriority(editTask.priority);
      setIsEdit(true);
    }
  }, [editTask]);

  const handleEditAndSave = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      toastError("Title is required");
      return;
    }

    if (isEdit) {
      updateTaskInList({
        id: editTask.id,
        title,
        description,
        due_date: dueDate,
        priority,
      });
      toastSuccess("Task Updated");
    } else {
      addTaskInList({ title, description, due_date: dueDate, priority });
      toastSuccess("Task Added");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <form onSubmit={handleEditAndSave}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit Task" : "Add Task"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="eg. Workout"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="eg. Need to go to gym"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Datetime
                closeOnSelect={true}
                onChange={(e) => {
                  setDueDate(e);
                }}
                value={dueDate}
                isValidDate={(current) => {
                  var yesterday = moment().subtract(1, "day");
                  return current.isAfter(yesterday);
                }}
                renderInput={(props) => {
                  return (
                    <Input {...props} placeholder="Select Due Date and Time" />
                  );
                }}
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <Select
                placeholder="Select option"
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
                value={priority}
              >
                <option value={HIGH_PRIORITY}>High</option>
                <option value={MEDIUM_PRIORITY}>Medium</option>
                <option value={LOW_PRIORITY}>Low</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="ghost" type="submit" onClick={handleEditAndSave}>
              {isEdit ? "Save" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default TaskModal;
