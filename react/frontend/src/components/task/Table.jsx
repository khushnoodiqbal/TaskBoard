import React, { useEffect, useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import AddTask from "./AddTask";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";
import axios from "axios";
import { useParams } from 'react-router-dom';


const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks, setFilteredTasks , settaskhandler }) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [tasktoedit, settasktoedit] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setedit] = useState(false);
  const { status } = useParams();
    
  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };
  const edittask = (task) => {
    console.log(task)
    settasktoedit(task);
    setedit(true)
    setSelected(task.taskId);
    setOpen(true);
  };

  const deleteHandler = async () => {
    try {
      console.log(selected, "Deleting task...");

      const response = await axios.delete(
        `http://localhost:3000/tasks/delete?taskId=${selected}`
      );

      if (response.status === 200) {
        console.log("task delteeeeeeeeeee");
        setFilteredTasks((prevtasks) =>
          prevtasks.filter((task) => task.taskId !== selected)
        );

        setOpenDialog(false);
      } else {
        // setSuccessMessage("Failed to delete the user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      // setSuccessMessage(
      //   "An error occurred while deleting the user. Please try again."
      // );
    }
  };

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black  text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2 ">Stage</th>
        <th className="py-2 ">Created At</th>
        <th className="py-2 ml-11">Action</th>

        {/* <th className='py-2'>Assets</th> */}
        {/* <th className='py-2'>Team</th> */}
      </tr>
    </thead>
  );
  
  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage.toLowerCase()])}
          />
          <p className="w-full line-clamp-2 text-base text-black">
            {task?.title}
          </p>
        </div>
      </td>

      <td className="py-2">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="capitalize line-clamp-1">{task?.priority}</span>
        </div>
      </td>
      <td className="py-2">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.stage])}>
            {ICONS[task?.stage]}
          </span>
          <span className="capitalize line-clamp-1">{task?.stage}</span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-sm text-gray-600">
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      {/* <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1 items-center text-sm text-gray-600'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td> */}

      {/* <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td> */}

      <td className="py-2 flex gap-1 md:gap-4">
        <Button
          className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
          label="Edit"
          type="button"
          onClick={() => {
            edittask(task);
          
          }}
        />

        <Button
          className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
          label="Delete"
          type="button"
          onClick={() => deleteClicks(task.taskId)}
        />
      </td>
    </tr>
  );
  return (
    <>
      <div className="bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task}  />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <AddTask
        open={open}
        setOpen={setOpen}
        edit={edit}
        tasktoedit={tasktoedit}
        settaskhandler={settaskhandler} 
        key={new Date().getTime().toString()}
      />
    </>
  );
};

export default Table;
