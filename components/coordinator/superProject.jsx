import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { AcceptOrRejectSupervisingRequest } from "../../redux/features/coordinator/coordinator_slice";

const SuperVisedProject = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { email } = session.user;
  const projects = useSelector((state) => state.coordinator.projects.projects);
  console.log(projects);
  function filterEmployeesByEmail(email) {
    const filteredEmployees = [];
    projects?.forEach((obj) => {
      obj.employee.forEach((x) => {
        if (x.employee_email === email) {
          filteredEmployees.push(x);
        }
      });
    });
    return filteredEmployees;
  }
  const filteredEmployees = filterEmployeesByEmail(email);
  console.log("filtered projects by employee");
  console.log(filterEmployeesByEmail(email));
  const handleAccept = (status, x) => {
    const data = {
      project_id: x.project_id,
      id: x.id,
      status: status,
    };
    dispatch(AcceptOrRejectSupervisingRequest(data));
  };
  return (
    <div className="superVisedProjects">
      <div className="superVisedProject_wrapper">
        <div className="flex  items-center text-4xl  m-4  justify-center">
          {" "}
          Projects Under My Supervision{" "}
        </div>
        {filteredEmployees.length > 0 ? (
          <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
            <tbody>
              <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                <th className="border text-center p-2">Project Id</th>
                <th className="border text-center p-2">My Role</th>
                <th className="border text-center p-2">Status</th>
                <th className="border text-center p-2">view more</th>
              </tr>
              {filteredEmployees.map((x) => (
                <tr className="studentlist_tr text-black">
                  <td className="border  cursor-pointer text-center p-2">
                    {x.project_id}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {x?.role}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {x?.status === "ACCEPTED" ? (
                      x?.status
                    ) : (
                      <div>
                        <span
                          onClick={() => handleAccept("ACCEPTED", x)}
                          className="p-2 hover:bg-green-500 bg-green-700 text-white rounded-lg"
                        >
                          Accept
                        </span>{" "}
                        <span className="p-2 hover:bg-red-500 bg-red-700 text-white rounded-lg">
                          Reject
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
                    <span className="bg-green-700 text-white p-2 rounded-lg hover:bg-green-500">
                      {" "}
                      view More{" "}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center text-2xl">
            <span>Sorry You are not working on any project</span>
          </div>
        )}
      </div>{" "}
    </div>
  );
};
export default SuperVisedProject;
