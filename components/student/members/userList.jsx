import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addStudentByAdminStudent,
  clearAddingStudentError,
} from "../../../redux/features/student/studentSlice";
const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const student = useSelector((state) => state.student.student);
  const myProject = useSelector((state) => state.student?.projects);
  const dispatch = useDispatch();
  console.log("These are the students");
  console.log(student);
  const [users, setUsers] = useState();
  const addingStudentError = useSelector(
    (state) => state.student?.addingStudentByStudentError
  );
  useEffect(() => {
    console.log("I am called");
    const timer = setTimeout(() => {
      console.log("I am called after 3 seconds");
      dispatch(clearAddingStudentError(""));
    }, 5000);
    return () => clearTimeout(timer);
  }, [addingStudentError, dispatch]);
  useEffect(() => {
    const fetchAllStudents = async () => {
      const resp = await axios.get("http://localhost:3000/api/student/all");
      console.log("repsonse object");
      console.log(resp.data);
      setUsers(resp.data);
      return resp.data;
    };
    fetchAllStudents();
  }, []);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //   const handleAddToGroup = async (userId) => {
  //     try {
  //       const resp = await axios.put(
  //         `http://localhost:3000/api/student/addStudent?reg_no=${userId}&projectId=${myProject?.id}`,
  //         {
  //           reg_no: userId,
  //           projectId: myProject?.id,
  //         }
  //       );
  //       if (resp.status === "200") {
  //         console.log("ok ");
  //       } else {
  //         setError(resp.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const handleAddingStudent = (reg_no) => {
    const data = {
      reg_no: reg_no,
      projectId: myProject?.id,
    };
    dispatch(addStudentByAdminStudent(data));
  };
  return (
    <div className="h-64 overflow-y-scroll">
      <input
        type="text"
        placeholder="Search users"
        value={searchQuery}
        onChange={handleSearch}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
      />
      <ul className="space-y-2">
        {filteredUsers?.map((user) => (
          <li key={user.id} className="flex items-center justify-center">
            <span className="flex-1 flex justify-center items-center">
              {user.name}{" "}
            </span>{" "}
            <span
              onClick={() => handleAddingStudent(user?.reg_no)}
              className="flex-1 rounded-lg hover:text-white cursor-pointer hover:bg-green-500  flex justify-center items-center text-blue-800"
            >
              Add
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
