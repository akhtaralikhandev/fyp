import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EmployeeRole } from "@prisma/client";
const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const student = useSelector((state) => state.student.student);
  const myProject = useSelector((state) => state.student?.projects);
  const dispatch = useDispatch();
  console.log("These are the students");
  console.log(student);
  const [users, setUsers] = useState();

  const fetchAllFaculty = async () => {
    const resp = await axios.get("http://localhost:3000/api/student/faculty");
    console.log("repsonse object");
    console.log(resp.data);
    setUsers(resp.data);
    return resp.data;
  };
  useEffect(() => {
    fetchAllFaculty();
  }, []);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendRequest = async (employee_email) => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/employee_project/supervisor",
        {
          projectId: myProject?.id,
          role: EmployeeRole.ADVISOR,
          employee_email: employee_email,
          undo: false,
        }
      );
      fetchAllFaculty();
      if (resp.status === "200") {
        fetchAllFaculty();
      } else {
        console.log(resp.data);
      }
      console.log(resp);
    } catch (error) {
      fetchAllFaculty();
      setError(error?.response?.data?.message);
      console.log(error);
      // Clear the error after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  const handleUndoRequest = async (employee_email) => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/employee_project/supervisor",
        {
          projectId: myProject?.id,
          role: EmployeeRole.ADVISOR,
          employee_email: employee_email,
          undo: true,
        }
      );
      fetchAllFaculty();
      if (resp.status === "200") {
        fetchAllFaculty();
      } else {
        console.log(resp.data);
      }
      console.log(resp);
    } catch (error) {
      fetchAllFaculty();
      setError(error?.response?.data?.message);
      console.log(error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  const isUserPartOfProject = (user, projectId) => {
    return user.projects.some((project) => project.project_id === projectId);
  };
  return (
    <div className="h-full  overflow-y-scroll  shadow-lg p-4">
      {error && <span className="text-red-500 text-xl">{error}</span>}
      <input
        type="text"
        placeholder="Search users"
        value={searchQuery}
        onChange={handleSearch}
        className="border w-full border-gray-300 rounded px-3 py-2 mb-4"
      />
      <ul className="space-y-2">
        <li className="flex items-center justify-between mb-8">
          <span
            className="flex-1
              rounded-lg
              cursor-pointer
              flex
              justify-center
              items-center"
          >
            Name
          </span>
          <span
            className="flex-1
              rounded-lg
              cursor-pointer
              flex
              justify-center
              items-center"
          >
            No of Projects Supervising
          </span>
          <span
            className="flex-1
              rounded-lg
              cursor-pointer
              flex
              justify-center
              items-center"
          >
            Contact No
          </span>
          <span
            className="flex-1
              rounded-lg
              cursor-pointer
              flex
              justify-center
              items-center"
          >
            Email
          </span>
          <span
            className="flex-1
              rounded-lg
              cursor-pointer
              flex
              justify-center
              items-center"
          >
            Send Request
          </span>
        </li>
        {filteredUsers?.map((user) => (
          <li key={user.id} className="flex items-center justify-between">
            <span
              className="   flex-1
              rounded-lg
              cursor-pointer
              flex
              justify-center
              items-center
             "
            >
              {user.name}
            </span>
            <span
              className=" flex-1
              cursor-pointer 
              flex
              justify-center
              items-center
             "
            >
              5
            </span>
            <span
              className=" flex-1
              cursor-pointer 
              flex
              justify-center
              items-center
             "
            >
              {user?.contact_no}
            </span>
            <span
              className=" flex-1
              cursor-pointer 
              flex
              justify-center
              items-center
             "
            >
              {user?.email}
            </span>
            {isUserPartOfProject(user, myProject?.id) ? (
              <span
                onClick={() => handleUndoRequest()}
                className="flex-1 p-2 cursor-pointer rounded-lg border border-blue-500  hover:text-white  hover:bg-blue-500 flex justify-center items-center"
              >
                Undo Request
              </span>
            ) : (
              <span
                onClick={() => handleSendRequest(user?.email)}
                className="flex-1 p-2 cursor-pointer rounded-lg border border-blue-500  hover:text-white  hover:bg-blue-500 flex justify-center items-center"
              >
                Send Request
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
