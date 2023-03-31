import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { setProjectId } from "../../../redux/features/employee/employeeSlice";
import { AcceptOrRejectSupervisingRequest } from "../../../redux/features/coordinator/coordinator_slice";
const ProjectList = ({ onDelete, project, onSubmit, onEdit }) => {
  const employee = useSelector((state) => state.employee.employee);
  console.log("Project employee working on ");
  console.log(employee);
  const router = useRouter();
  const dispatch = useDispatch();
  const groupLeader = (email) => {
    return project?.students?.find((x) => x.email === email);
  };
  const handleClick = (id) => {
    dispatch(setProjectId(id));
    router.push("/employee/project");
  };
  const handleAccept = (status, x) => {
    const data = {
      project_id: x.project_id,
      id: x.id,
      status: status,
    };
    dispatch(AcceptOrRejectSupervisingRequest(data));
  };

  return (
    <tr className="studentlist_tr text-black">
      <td className="border  cursor-pointer text-center p-2">
        {project.project_id}
      </td>
      <td className="border  cursor-pointer text-center p-2">{project.role}</td>
      <td className="border  cursor-pointer text-center p-2">
        {project?.project?.admin_student_email}
      </td>

      <td className="border  cursor-pointer text-center p-2">
        {project?.status === "PENDING" ? (
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={() => handleAccept("ACCEPTED", project)}
              className="bg-blue-700 hover:bg-blue-500 text-white rounded-lg p-2"
            >
              Accept
            </button>
            <button className="bg-red-700 hover:bg-red-500 text-white rounded-lg p-2">
              Decline
            </button>
          </div>
        ) : (
          project?.status
        )}
      </td>
      <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
        <span
          onClick={() => {
            handleClick(project.project_id);
          }}
          className="bg-green-700 p-2 rounded-lg text-white cursor-pointer"
        >
          view more
        </span>
      </td>
    </tr>
  );
};
export default ProjectList;
