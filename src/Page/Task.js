import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  useTransition,
} from "react";
import {
  getLocalstorageItem,
  setLocalStorageItem,
} from "../services/localstorage.service";
import TaskCard from "../components/TaskCard";
import ActionTab from "../components/Tabs";
import SearchInput from "../components/SearchInput";
import {
  Box,
  Center,
  Text,
  Grid,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import AddButton from "../components/AddButton";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "react-router-dom";
import {
  ALL,
  ALL_PRIORITY,
  COMPLETED,
  DATE_HIGH_TO_LOW,
  DATE_LOW_TO_HIGH,
  HIGH_PRIORITY,
  LOW_PRIORITY,
  MEDIUM_PRIORITY,
  OVERDUE,
  PRIORITY_HIGH_TO_LOW,
  PRIORITY_LOW_TO_HIGH,
  UPCOMING,
} from "../utils/constant.utils";
import moment from "moment";
import { toastError, toastSuccess } from "../utils/toast.utils";
import { CircularProgress } from "@chakra-ui/react";

const TaskModal = lazy(() => import("../components/TaskModal"));

const Task = () => {
  const TASK_LIST = "task_list";
  const [isPending, startTransition] = useTransition();
  const [taskList, setTaskList] = useState(
    JSON.parse(getLocalstorageItem(TASK_LIST)) || []
  );
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [editTask, setEditTask] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalClose = () => {
    onClose();
    setEditTask({});
  };

  let [searchParams] = useSearchParams();
  const selected = searchParams.get("selected");
  const priority = searchParams.get("priority");
  const sort = searchParams.get("sort");

  useEffect(() => {
    setFilteredList((prevFilteredList) => {
      var list;
      if (search !== "") {
        list = prevFilteredList;
      } else {
        list = taskList;
      }

      if (priority !== ALL_PRIORITY) {
        list = list.filter((task) => task.priority === priority);
      }

      if (selected === COMPLETED) {
        list = list.filter((task) => task.is_completed);
      }

      if (selected === UPCOMING) {
        list = list.filter(
          (task) =>
            moment(task.due_date).isAfter(new Date()) &&
            task.is_completed === false
        );
      }
      if (selected === OVERDUE) {
        list = list.filter(
          (task) =>
            moment(task.due_date).isBefore(new Date()) &&
            task.is_completed === false
        );
      }

      if (sort === DATE_HIGH_TO_LOW) {
        list = list.sort((t1, t2) => {
          return new Date(t2.due_date) - new Date(t1.due_date);
        });
      }
      if (sort === DATE_LOW_TO_HIGH) {
        list = list.sort((t1, t2) => {
          return new Date(t1.due_date) - new Date(t2.due_date);
        });
      }

      if (sort === PRIORITY_LOW_TO_HIGH || sort === PRIORITY_HIGH_TO_LOW) {
        const high = list.filter((task) => task.priority === HIGH_PRIORITY);
        const medium = list.filter((task) => task.priority === MEDIUM_PRIORITY);
        const low = list.filter((task) => task.priority === LOW_PRIORITY);
        if (sort === PRIORITY_HIGH_TO_LOW) {
          list = [...high, ...medium, ...low];
        }
        if (sort === PRIORITY_LOW_TO_HIGH) {
          list = [...low, ...medium, ...high];
        }
      }

      return [...list];
    });
  }, [selected, taskList, priority, sort]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.trim());
    startTransition(() => {
      setFilteredList((prevFilteredList) => {
        const lowerCaseSearch = e.target.value
          .toLowerCase()
          .trimStart()
          .trimEnd();
        if (lowerCaseSearch === "") {
          return [...taskList];
        }
        const list = prevFilteredList.filter((task) => {
          return (
            task.title.toLowerCase().includes(lowerCaseSearch) ||
            task.description.toLowerCase().includes(lowerCaseSearch)
          );
        });
        return [...list];
      });
    });
  };

  const addTaskInList = (task) => {
    setTaskList((prevTaskList) => [
      ...prevTaskList,
      { ...task, id: uuidv4(), is_completed: false },
    ]);
    onClose();
    setEditTask({});
  };

  const removeTaskFromList = (task_id) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((task) => task.id !== task_id)
    );
    toastError("Task Deleted");
  };

  const updateTaskInList = (updated_task) => {
    setTaskList((taskList) => {
      const index = taskList.findIndex((task) => task.id === updated_task.id);
      taskList[index].title = updated_task.title;
      taskList[index].description = updated_task.description;
      taskList[index].due_date = updated_task.due_date;
      taskList[index].priority = updated_task.priority;
      return [...taskList];
    });
    setEditTask({});
    onClose();
  };

  const completeTask = (task_id) => {
    setTaskList((taskList) => {
      const index = taskList.findIndex((task) => task.id === task_id);
      taskList[index].is_completed = true;
      return [...taskList];
    });
    toastSuccess("TasK Completed");
  };

  useEffect(() => {
    setLocalStorageItem(TASK_LIST, taskList);
  }, [taskList]);

  return (
    <Box maxWidth={{ base: "100%", md: "40%" }} margin={"25px auto"}>
      <Center marginBottom={"25px"}>
        <h1
          style={{
            fontFamily: "serif",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Elitefit AI Todo List
        </h1>
      </Center>
      <Suspense
        fallback={
          <div>
            <CircularProgress isIndeterminate />
          </div>
        }
      >
        <TaskModal
          isOpen={isOpen}
          handleModalClose={handleModalClose}
          editTask={editTask}
          addTaskInList={addTaskInList}
          updateTaskInList={updateTaskInList}
        />
      </Suspense>
      <ActionTab />
      <SearchInput search={search} handleSearchChange={handleSearchChange} />
      <AddButton onOpen={onOpen} />

      {isPending ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
            gap={5}
            padding={{ base: "10px", md: "0" }}
          >
            {filteredList.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                setEditTask={setEditTask}
                onOpen={onOpen}
                removeTask={removeTaskFromList}
                completeTask={completeTask}
              />
            ))}
          </Grid>
          <Center>
            {filteredList.length === 0 ? (
              <Text fontSize={"25px"} margin={"15px"}>
                {selected === ALL ? "Please add a task" : ""}
                {selected === UPCOMING ? "No Task is Upcoming" : ""}
                {selected === OVERDUE ? "No Task is Overdue" : ""}
                {selected === COMPLETED ? "No Task is Completed" : ""}
              </Text>
            ) : (
              <></>
            )}
          </Center>
        </>
      )}
    </Box>
  );
};

export default Task;
