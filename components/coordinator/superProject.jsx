import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
const SuperVisedProject = () => {
  const { data: session } = useSession();
  const { email } = session.user;
  const projects = useSelector((state) => state.coordinator.projects.projects);
  function filterEmployeesByEmail(email) {
    const filteredEmployees = [];
    projects?.forEach((obj) => {
      obj.employee.forEach((x) => {
        if (x.employee_email === email && x.status === "ACCEPTED") {
          filteredEmployees.push(x);
        }
      });
    });
    return filteredEmployees;
  }
  const filteredEmployees = filterEmployeesByEmail(email);
  console.log(filterEmployeesByEmail(email));
  return (
    <div className="superVisedProjects">
      <div className="superVisedProject_wrapper">
        <span>Projects Under My Supervision</span>
        {filteredEmployees.map((x) => (
          <ul className="flex gap-4 items-center justify-center">
            <li>{x.project_id}</li>
            <li>{x.role}</li>
            <li>{x.status}</li>
            <li
              onClick={() => handleAccept("ACCEPTED", x)}
              className="bg-green-700 cursor-pointer p-2 rounded-lg text-white"
            >
              Accept
            </li>
            <li className="bg-red-700 cursor-pointer p-2 rounded-lg text-white">
              Reject
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default SuperVisedProject;
