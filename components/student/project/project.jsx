import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Navbar from "../navbar/navbar";
const ProjectDetail = () => {
  const myProject = useSelector((state) => state.student?.projects);
  console.log("this is my project ok done");
  console.log(myProject);
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
        <div className="right mt-24 m-2  p-8  w-full">
          <div className="mb-12 flex items-center gap-8">
            <div className="flex gap-8 items-center shadow-lg p-8 rounded-lg">
              <span className="text-4xl text-purple-700 font-bold">
                Welcome
              </span>{" "}
              <span className="text-4xl italic">{name}!</span>
              <span className="text-2xl  text-purple-700">
                Hard work beats talent when talent doesn't work hard,
              </span>
            </div>
          </div>
          <div className=" shadow-lg p-8">
            <span className="text-4xl text-blue-900">Project Details</span>
            <div className="flex flex-col gap-4 mt-12">
              <div className="flex  justify-between">
                <span className=" flex-1 flex items-center text-2xl">
                  Title
                </span>
                <span className=" flex-1 text-xl flex items-center">
                  {myProject?.title}
                </span>
              </div>
              <div className="flex  justify-between">
                <span className=" flex-1 flex items-center text-2xl">
                  Description
                </span>
                <span className=" flex-1 text-xl flex items-center">
                  {myProject?.description}
                </span>
              </div>
              <div className="flex  justify-between">
                <span className=" flex-1 flex items-center text-2xl">
                  Coordinator Approval
                </span>
                <span className=" flex-1 text-xl flex items-center">
                  {myProject?.status}
                </span>
              </div>
              <div className="flex  justify-between">
                <span className=" flex-1 flex items-center text-2xl">
                  Presentation Assigned
                </span>
                <span className=" flex-1 text-xl flex items-center">
                  {myProject?.Presentation_Scedule?.length}
                </span>
              </div>
              <div className="flex  justify-between">
                <span className=" flex-1 flex items-center text-2xl">
                  Admin Student
                </span>
                <span className=" flex-1 text-xl flex items-center">
                  {myProject?.admin_student_email}
                </span>
              </div>
              <div className="flex  justify-between">
                <span className=" flex-1 flex items-center text-2xl">
                  Number of Students
                </span>
                <span className=" flex-1 text-xl flex items-center">
                  {myProject?.students?.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
export default ProjectDetail;
