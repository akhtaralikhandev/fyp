import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteConfirmation from "../confirm/confirm";
import AddEmployee from "./addEmp";
import AddProject from "./addProject";

const ViewMore = () => {
  const dispatch = useDispatch();
  const [addProject, setAddProject] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  console.log("view panel");
  const employee = useSelector((state) => state.employee.employee);
  console.log("this is the employee");
  console.log(employee);
  const projectId = useSelector((state) => state.employee.projectId);

  console.log("this is the project id ");
  console.log(projectId);
  const allEmployeesOfDepartment = useSelector(
    (state) => state.employee?.employee?.department?.employee
  );
  const allProjectsOfDepartment = useSelector(
    (state) => state.employee?.employee?.department?.projects
  );
  const allProjectOfThisEmployee = useSelector(
    (state) => state.employee?.employee?.projects
  );
  const thisProject = allProjectOfThisEmployee.filter(
    (x) => x.project_id === projectId
  );
  console.log("this is this project ok done and dusted");
  console.log(thisProject);
  console.log("all project are this ");
  console.log(allProjectsOfDepartment);
  console.log("this employee all projects");
  console.log(allProjectOfThisEmployee);
  console.log(allEmployeesOfDepartment);

  return (
    <div className="viewPanel">
      <div className="viewPanel_wrapper">
        <div className="flex flex-col relative">
          <div>
            <span>Project Id : {thisProject[0]?.project_id}</span>
          </div>
          <div className="flex items-center justify-center">
            Employee Detail
          </div>
          <span
            className="close absolute right-10 bg-red-600 text-white rounded-lg p-2  cursor-pointer"
            onClick={() => {
              console.log("clicked");

              //   setId(panel2?.id);
              //   setViewMore(false);
            }}
          >
            Close
          </span>
        </div>
        <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">Email</th>
              <th className="border text-center p-2">Role</th>
              <th className="border text-center p-2">status</th>
              <th className="border text-center p-2">Remove</th>
            </tr>
            {thisProject[0]?.project?.employee?.map((x) => (
              <tr className="studentlist_tr text-black">
                <td className="border  cursor-pointer text-center p-2">
                  {x?.employee_email}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.role}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.status}
                </td>
                <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
                  <DeleteConfirmation email={x?.email} id={thisProject?.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
        {/* <div className="mt-8 flex flex-col">
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
            <AddEmployee employees={allEmployees} id={panel2?.id} />
          ) : (
            ""
          )}
        </div> */}
        <div className=" flex items-center justify-center">
          {" "}
          <span>Project Details</span>
        </div>
        <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">Project Id</th>
              <th className="border text-center p-2">Title</th>
              <th className="border text-center p-2">Admin Student</th>
              <th className="border text-center p-2">
                Presentation Date and Time
              </th>
              <th className="border text-center p-2"> Presentation Venue</th>
            </tr>
            <tr className="studentlist_tr text-black">
              <td className="border  cursor-pointer text-center p-2">
                {thisProject[0]?.project?.id}
              </td>
              <td className="border  cursor-pointer text-center p-2">
                {thisProject[0]?.project?.title}
              </td>
              <td className="border  cursor-pointer text-center p-2">
                {thisProject[0]?.project?.admin_student_email}
              </td>
              {thisProject[0]?.project?.date ? (
                <>
                  <td className="border  cursor-pointer text-center p-2">
                    {thisProject[0]?.project?.date}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {thisProject[0]?.project?.date}
                  </td>{" "}
                </>
              ) : (
                <span>Add Presentation </span>
              )}
            </tr>
          </tbody>
        </table>{" "}
        <div className="mt-8 flex flex-col">
          {/* {updatePanelError && <span>{updatePanelError}</span>} */}
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
          {addProject ? <AddProject /> : ""}
        </div>
        <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">Reg No</th>
              <th className="border text-center p-2">Email</th>
              <th className="border text-center p-2">Name</th>
              <th className="border text-center p-2">Remove</th>
            </tr>
            {thisProject[0]?.project?.students?.map((x) => (
              <tr className="studentlist_tr text-black">
                <td className="border  cursor-pointer text-center p-2">
                  {x?.reg_no}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.email}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.name}
                </td>
                <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
                  <DeleteConfirmation email={x?.email} id={thisProject?.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
};
export default ViewMore;
