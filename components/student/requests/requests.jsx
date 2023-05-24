import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Sidebar from "../project/sidebar";
import { useState } from "react";
import Table from "./table";
import UserList from "./userList";
import Navbar from "../navbar/navbar";
const StudentRequestComp = () => {
  const myProject = useSelector((state) => state.student?.projects);
  const { data: session } = useSession();
  const addingStudentError = useSelector(
    (state) => state.student?.addingStudentByStudentError
  );
  const name = session?.user?.name;
  console.log(session);
  return (
    <div className="projectDetailStudent">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main flex">
        <div className="left">
          <Sidebar />
        </div>

        <div className="right mt-24 m-2  w-full  justify-between pr-24 p-2 flex ">
          <div className="flex flex-col gap-2">
            <span className="text-3xl mb-8 mt-8">New Requests </span>
            <Table />
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
export default StudentRequestComp;
