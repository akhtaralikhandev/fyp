import Sidebar from "../project/sidebar";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import UserList from "./userList";
import Navbar from "../navbar/navbar";
const SupervisorCompStudent = () => {
  const myProject = useSelector((state) => state.student?.projects);
  const addingStudentError = useSelector(
    (state) => state.student?.addingStudentByStudentError
  );
  const { data: session } = useSession();
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
          <div className="container  mx-auto my-4">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
              Request Supervising
            </button>
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupervisorCompStudent;
