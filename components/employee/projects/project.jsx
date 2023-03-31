import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee } from "../../../redux/features/employee/employeeSlice";

const Project = () => {
  const { data: session } = useSession();
  const employee = useSelector((state) => state.employee.employee);
  // projects employee working on
  const projects = useSelector((state) => state.employee.employee.projects);
  console.log(projects);
  console.log(employee);
  const dispatch = useDispatch();
  const { email, department_name } = session.user;
  console.log(email);
  useEffect(() => {
    dispatch(fetchEmployee(email));
  }, []);
  return (
    <div className="project">
      <div className="project_wrapper">
        <div className="intro flex flex-col gap-2 items-center justify-center">
          <span>Welcome {employee?.name}</span>
          <span>Panel Number {employee?.panelNumber}</span>
          {projects.length > 0 ? (
            <span></span>
          ) : (
            <span>You are currently not working on any project</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Project;
