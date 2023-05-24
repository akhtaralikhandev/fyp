import { useSession } from "next-auth/react";
import AddEmployee from "../AddEmp";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar/panelSidebar";
import DeleteConfirmation from "../confirm/confirm";
import { NavbarContext } from "../../navbarContext";
import { clearPanelUpdateError } from "../../../../redux/features/panel/panelSlice";
import AddProject2 from "../addProject";
const SinglePanelComp = ({ panel }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [myProject, setProjects] = useState();
  const department_name = session?.user?.department_name;
  const email = session?.user?.email;
  const {
    id,
    setId,
    setViewMore,
    more,
    setAddEmployee,
    addEmployee,
    addProject,
    setAddProject,
  } = useContext(NavbarContext);
  const allEmployees = useSelector(
    (state) => state.coordinator.projects.employee
  );
  const allProjects = useSelector(
    (state) => state.coordinator.projects.projects
  );
  const updatePanelError = useSelector((state) => state.panel.updatePanelError);

  useEffect(() => {
    console.log("I am called");
    const timer = setTimeout(() => {
      console.log("I am called after 3 seconds");
      dispatch(clearPanelUpdateError(""));
    }, 5000);
    return () => clearTimeout(timer);
  }, [updatePanelError, dispatch]);

  console.log("these are the my projects");
  console.log(myProject);
  return (
    <div className="w-full">
      <div className="navbarSupervisioned">
        <Navbar />
      </div>
      <div className="mainbody flex ">
        <div className="leftside w-64  bg-slate-200 fixed">
          <Sidebar />
        </div>
        <div className="rightside mt-24 m-2 flex flex-col ml-72 gap-12 items-center  w-full">
          <span className="text-4xl text-blue-800 underline">
            # Panel No {panel?.id}
          </span>
          <span className="text-2xl">Faculty members of this Panel</span>
          <table className="table  mt-8  w-full   border-collapse border-slate-500  ">
            <tbody>
              <tr className="  border-blue-500e text-2xl">
                <th className="border border-gray-500 text-center p-2">
                  Email
                </th>
                <th className="border border-gray-500 text-center p-2">name</th>
                <th className="border border-gray-500 text-center p-2">
                  contact no
                </th>
                <th className="border border-gray-500 text-center p-2">
                  Remove
                </th>
              </tr>
              {panel?.Employees?.map((x) => (
                <tr className="studentlist_tr text-black">
                  <td className="border border-gray-500  cursor-pointer text-center p-2">
                    {x?.email}
                  </td>
                  <td className="border border-gray-500  cursor-pointer text-center p-2">
                    {x?.name}
                  </td>
                  <td className="border border-gray-500 cursor-pointer text-center p-2">
                    {x?.contact_no}
                  </td>
                  <td className="border border-gray-500 flex gap-4 items-center justify-center cursor-pointer text-center p-2">
                    <DeleteConfirmation email={x?.email} id={panel?.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8  flex-col w-full flex items-center justify-center">
            {updatePanelError && <span>{updatePanelError}</span>}
            <span
              onClick={() => setAddEmployee(!addEmployee)}
              className={
                addEmployee
                  ? "bg-red-700 cursor-pointer w-1/4 text-white text-center p-2 rounded-lg m-2 mt-8"
                  : "bg-green-700 cursor-pointer w-1/4 text-center text-white p-2 rounded-lg m-2 mt-8"
              }
            >
              {addEmployee ? <span>Cancel </span> : <span>Add Employee</span>}
            </span>
            {addEmployee ? (
              <AddEmployee employees={allEmployees} id={panel?.id} />
            ) : (
              ""
            )}
          </div>
          <span className="text-2xl">Projects Of This Panel</span>
          <table className="table  mt-8  w-full   border-collapse border-slate-500  ">
            <tbody>
              <tr className="  border-blue-500e text-2xl">
                <th className="border border-gray-500 text-center p-2">
                  Title
                </th>

                <th className="border border-gray-500 text-center p-2">
                  Description
                </th>
                <th className="border border-gray-500 text-center p-2">
                  No Of Presentations
                </th>
                <th className="border border-gray-500 text-center p-2">
                  Remove
                </th>
              </tr>
              {panel?.projects?.map((x) => (
                <tr className="studentlist_tr text-black">
                  <td className="border border-gray-500  cursor-pointer text-center p-2">
                    {x?.title}
                  </td>
                  <td className="border border-gray-500  cursor-pointer text-center p-2">
                    {x?.description}
                  </td>
                  <td className="border border-gray-500 cursor-pointer text-center p-2">
                    {x?.Presentation_Scedule?.length}
                  </td>
                  <td className="border border-gray-500 flex gap-4 items-center justify-center cursor-pointer text-center p-2">
                    <DeleteConfirmation email={x?.email} id={panel?.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
          <div className="mt-8  flex-col w-full flex items-center justify-center">
            {updatePanelError && <span>{updatePanelError}</span>}
            <span
              onClick={() => setAddProject(!addProject)}
              className={
                addProject
                  ? "bg-red-700 text-center cursor-pointer w-1/4 text-white p-2 rounded-lg m-2 mt-8"
                  : "bg-green-700 text-center cursor-pointer w-1/4 text-white p-2 rounded-lg m-2 mt-8"
              }
            >
              {addProject ? <span>Cancel </span> : <span>Add Project</span>}
            </span>
            {addProject ? (
              <AddProject2 projects={allProjects} id={panel.id} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePanelComp;
