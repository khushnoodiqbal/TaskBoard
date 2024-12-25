import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]); // Corrected casing
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [userToEdit, setUserToEdit] = useState(null);
  const [checkId,setcheckId]=useState(false);

  // Fetch users data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/get-all");
        setUsers(response.data.data.rows || []); // Handle undefined rows
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleUserCreated = (newUser) => {
    console.log(newUser);
    if(checkId){
    setUsers((prev) => [...prev, newUser]);
    }
    else{
       setUsers(newUser)
    }
    // setUsers((newUser) =>
    //   newUser.map((user) =>
    //     user.userId === newUser.userId ? newUser : user
    //   )
    // );
  
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (user) => {
    setSelected(user);
    setUserToEdit(user);
    setOpen(true);
    setcheckId(false)
    console.log(userToEdit)
  };

  const userActionHandler = () => {};
  const deleteHandler = async () => {
    try {
      console.log(selected, "Deleting user...");

      const response = await axios.delete(
        `http://localhost:3000/users/delete?userId=${selected}`
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== selected)
        );
        setSuccessMessage("User deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          setOpenDialog(false);
          setSelected(null);
        }, 2000);
      } else {
        setSuccessMessage("Failed to delete the user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      setSuccessMessage(
        "An error occurred while deleting the user. Please try again."
      );
    }
  };

  // Table Header Component
  const TableHeader = () => (
    <thead className="bg-gray-100 border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-3 px-4">Full Name</th>
        <th className="py-3 px-4">Username</th>
        <th className="py-3 px-4">Email</th>
        <th className="py-3 px-4">Role</th>
        {/* <th className="py-3 px-4">Status</th> */}
        <th className="py-3 pl-14">Actions</th>
      </tr>
    </thead>
  );

  // Table Row Component
  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
            <span className="text-xs md:text-sm">{getInitials(user.name)}</span>
          </div>
          {user.name}
        </div>
      </td>
      <td className="p-3 px-4">{user.username}</td>
      <td className="p-3 px-4">{user.email || "N/A"}</td>
      <td className="p-3 px-4">{user.role || "N/A"}</td>
      {/* <td className="p-3 px-4">
        <button
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td> */}
      <td className="p-3 px-4 flex gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
          label="Edit"
          type="button"
          onClick={() => editClick(user)}
        />
        <Button
          className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
          label="Delete"
          type="button"
          onClick={() => deleteClick(user?.userId)}
        />
      </td>
    </tr>
  );
  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
            onClick={() =>{ 
              setOpen(true)
              setUserToEdit(null)
              setcheckId(true)
              
            }}
          />
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.userId} user={user} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Dialog */}
      <AddUser
        open={open}
        setOpen={setOpen}
        userToEdit={userToEdit}
        checkId={checkId}
        onUserCreated={handleUserCreated}
        key={new Date().getTime().toString()}
      />

      {/* Confirmation Dialog */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
        message={successMessage}
  
      />

      {/* User Action Dialog */}
      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
