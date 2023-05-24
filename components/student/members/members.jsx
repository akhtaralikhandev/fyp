import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Sidebar from "../project/sidebar";
import { useState } from "react";
import Table from "./table";
import UserList from "./userList";
import Navbar from "../navbar/navbar";
const MembersComp = () => {
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
            <span className="text-3xl mb-8 mt-8">Details of the students </span>
            <Table />
          </div>
          <div className="mt-8">
            {" "}
            {/* {addingStudentError && (
              <span className="text-xl text-red-500">{addingStudentError}</span>
            )} */}
            <div className="container mx-auto my-4">
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
                Add Member
              </button>
              <UserList />
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
export default MembersComp;
