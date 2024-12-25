import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import axios from "axios";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];
const AddTask = ({ open, setOpen, edit, tasktoedit, settaskhandler }) => {
  const task = "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [taskid, settaskid] = useState("");
  const [tasks, settasks] = useState("");

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const submitHandler = async (data) => {
    const payload = {
      ...data,
      stage,
      priority,
    };
    // setIsLoading(true);
    console.log(payload);
    try {
      if (edit) {
        var responseupd = await axios.put(
          "http://localhost:3000/tasks/update",
          {
            ...payload,
            taskId: tasktoedit.taskId,
          }
        );
        console.log("asdf", responseupd);
        if (responseupd.data.status === 200) {
           const responsea = await axios.get("http://localhost:3000/tasks/get-all");
           settaskhandler(responsea.data.data.rows || []);
          // const updatedUser = { ...tasktoedit, payload };
          // settaskhandler(updatedUser); // Pass the updated user to the parent
          
        }
        console.log(responseupd.data);
      } else {
        console.log("chl gya");
        const response = await axios.post(
          "http://localhost:3000/tasks/create",
          payload
        );
        console.log(response.data.data);
        if (settaskhandler) {
          settaskhandler(response.data.data);
        }

        if (response.data && response.data.status == 400) {
          console.error(response.data.error);
          alert(`Error:${response.data.error}`);
        } else if (
          !response.data.data ||
          Object.keys(response.data.data).length === 0
        ) {
          alert("Error: The response data is empty.");
        } else {
          settasks(response.data.data);
        }
      }
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              Uservalue={tasktoedit ? tasktoedit.title : ""}
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            {/* <UserList setTeam={setTeam} team={team} /> */}

            <div className="flex gap-4">
              <SelectList
                label="Task Stage"
                lists={LISTS}
                Uservalue={tasktoedit ? tasktoedit.stage : ""}
                selected={stage}
                setSelected={setStage}
              />

              <div className="w-full">
                <Textbox
                  placeholder="Date"
                  type="date"
                  name="date"
                  Uservalue={tasktoedit ? tasktoedit.date : ""}
                  label="Task Date"
                  className="w-full rounded"
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <SelectList
                label="Priority Level"
                lists={PRIORIRY}
                Uservalue={tasktoedit ? tasktoedit.priority : ""}
                selected={priority}
                setSelected={setPriority}
              />

              {/* <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div> */}
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              {uploading ? (
                <span className="text-sm py-2 text-red-500">
                  Uploading assets
                </span>
              ) : (
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                />
              )}

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => {
                  setOpen(false);
                }}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
