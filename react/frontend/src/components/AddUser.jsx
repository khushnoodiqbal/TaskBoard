import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import axios from "axios";
const AddUser = ({
  open,
  setOpen,
  checkId,
  userData,
  onUserCreated,
  userToEdit,
}) => {
  // let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false); // For triggering re-renders

  const isUpdating = false;
  // console.log(userToEdit.name,"ss")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(checkId);

  const handleOnSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (!checkId) {
        var responseupd = await axios.put(
          "http://localhost:3000/users/update",
          {
            ...data,
            userId: userToEdit.userId,
          }
        );
          console.log(data)       
        if (responseupd.data.data === 1) {
          // Notify parent to update the state with the new data
          const updatedUser = { ...userToEdit, ...data };
          onUserCreated(updatedUser); // Pass the updated user to the parent
          console.log(updatedUser);
        } 
        const responsea = await axios.get("http://localhost:3000/users/get-all");
        onUserCreated(responsea.data.data.rows || []);
        
        // console.log("User Updated:", responseupd.data);
      } else {
        const response = await axios.post(
          "http://localhost:3000/users/create",
          data
        );
        console.log(response)
        if (response.data && response.data.status==400) {
          console.error(response.data.error);
          alert(`Error:${response.data.error}`);
        } else if (
          !response.data.data ||
          Object.keys(response.data.data).length === 0
        ) {
          alert("Error: The response data is empty.");
        } else {
          onUserCreated(response.data.data);
        }
      }
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </Dialog.Title>
          <div className="mt-1 flex flex-col gap-3">
            <Textbox
              placeholder="Full name"
              type="text"
              name="name"
              Uservalue={userToEdit ? userToEdit.name : ""}
              label="Full Name"
              className="w-full rounded"
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder="User Name"
              type="text"
              name="username"
              Uservalue={userToEdit ? userToEdit.username : null}
              label="User Name"
              className="w-full rounded"
              register={register("username", {
                required: "Username is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="Email Address"
              type="email"
              name="email"
              label="Email Address"
              Uservalue={userToEdit ? userToEdit.email : ""}
              className="w-full rounded"
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            {checkId && (
              <Textbox
                placeholder="Password"
                type="text"
                name="password"
                label="Password"
                className="w-full rounded"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />
            )}
            <Textbox
              placeholder="Role"
              type="role"
              name="role"
              label="Role"
              className="w-full rounded"
              register={register("role", {
                required: "Role is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Submit"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
