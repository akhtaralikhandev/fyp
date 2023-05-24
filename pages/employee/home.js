import { useState } from "react";
import ProjectsUnderSupervisor from "../../components/employee/presentation/home";

const Employee = () => {
  return (
    <div className="employee_home">
      <div className="employee_home_wrapper">
        <ProjectsUnderSupervisor />
      </div>
    </div>
  );
};
export default Employee;
