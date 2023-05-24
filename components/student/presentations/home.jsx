import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import Navbar from "../navbar/navbar";
import Sidebar from "../project/sidebar";
import PresentationList from "./list";

const PresentationsComp = () => {
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
      <div className="main flex w-full">
        <div className="left fixed">
          <Sidebar />
        </div>
        <div className="right mt-24 ml-72 m-2  w-full   ">
          <PresentationList />
        </div>
      </div>{" "}
    </div>
  );
};
export default PresentationsComp;
