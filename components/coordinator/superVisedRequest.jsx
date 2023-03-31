import { useSession } from "next-auth/react";

import { useSelector, useDispatch } from "react-redux";
import { AcceptOrRejectSupervisingRequest } from "../../redux/features/coordinator/coordinator_slice";
const SuperVisedProjectsRequests = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.coordinator.projects.projects);

  const { data: session } = useSession();
  const { email } = session.user;
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
  const handleAccept = (status, x) => {
    const data = {
      project_id: x.project_id,
      id: x.id,
      status: status,
    };
    dispatch(AcceptOrRejectSupervisingRequest(data));
  };
  console.log("this is the supervised requests page");
  console.log(filteredEmployees);
  console.log(projects);
  console.log(email);
  return (
    <div className="supervisedProjects bg-slate-700 text-white">
      <div className="superVisedProjects_wrapper">
        {filteredEmployees.map((x) => (
          <ul className="flex gap-4 items-center justify-center">
            <li>{x.project_id}</li>
            <li>{x.role}</li>
            <li>{x.status}</li>
            <li
              onClick={() => {
                console.log("clicked");
                handleAccept("ACCEPTED", x);
              }}
              className="bg-green-700 cursor-pointer p-2 rounded-lg"
            >
              Accept
            </li>
            <li className="bg-red-700 cursor-pointer p-2 rounded-lg">Reject</li>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default SuperVisedProjectsRequests;
