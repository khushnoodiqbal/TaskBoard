import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
// import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import axios from "axios";
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  TODO: "bg-blue-600",
  "IN PROGRESS": "bg-yellow-600",
  COMPLETED: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  const [tasks, settasks] = useState([]);

  const [allTasks, setAllTasks] = useState([]); // Store all tasks
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/tasks/get-all");
        setAllTasks(response.data.data.rows || []);
        // Immediately filter based on the current status param
        filterTasks(response.data.data.rows || []);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterTasks(allTasks);
  }, [status, allTasks]);
  const filterTasks = (tasks) => {
    if (status) {
      setFilteredTasks(
        tasks.filter(
          (task) =>
            task.stage && task.stage.toLowerCase() === status.toLowerCase()
        )
      );
    } else {
      setFilteredTasks(tasks);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/tasks/get-all");
  //       settasks(response.data.data.rows || []);
  //     } catch (error) {
  //       console.error("Error fetching users:", error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const settaskhandler = (newTask) => {
    console.log("Task handleree");
    console.log(selected)
    if(selected){
      console.log("craeting time ");
    setFilteredTasks((prev) => [...prev, newTask]);
    }
    else{
    setFilteredTasks(newTask)
    }
  };

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => {
              setOpen(true);
              setSelected(true);
            }}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      {!status && (
        <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
          <TaskTitle label="To Do" className={TASK_TYPE.TODO} />
          <TaskTitle label="In Progress" className={TASK_TYPE["IN PROGRESS"]} />
          <TaskTitle label="completed" className={TASK_TYPE.COMPLETED} />
        </div>
      )}

      {/* {selected !== 1 ? (
         <></>
        ) : ( */}
      <div className="w-full">
        <Table
          tasks={filteredTasks}
          setFilteredTasks={setFilteredTasks}
          settaskhandler={settaskhandler}
        />
      </div>
      {/* )} */}

      <AddTask open={open} setOpen={setOpen} settaskhandler={settaskhandler} />
    </div>
  );
};

export default Tasks;
