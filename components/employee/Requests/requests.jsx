import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { AcceptOrRejectSupervisingRequest } from "../../../redux/features/coordinator/coordinator_slice";
import { useState, useEffect } from "react";
import Table from "./table";
import { fetchAllProjects } from "../../../redux/features/project/projectSlice";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";

const SupervisingRequestComp = () => {
  const projects = useSelector((state) => state?.project?.allProjects);
  console.log("this is the requests");
  console.log(projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProjects(department_name));
  }, []);
  const myProject = useSelector((state) => state.student?.projects);
  const { data: session } = useSession();
  const addingStudentError = useSelector(
    (state) => state.student?.addingStudentByStudentError
  );
  const name = session?.user?.name;
  const email = session?.user?.email;
  const department_name = session?.user?.department_name;

  console.log(session);
  function filterEmployeesByEmail(email) {
    const filteredEmployees = [];
    projects?.forEach((obj) => {
      obj.employee.forEach((x) => {
        if (x.employee_email === email && x.status === "PENDING") {
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
  const handleReject = (status, x) => {
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
    <div className="projectDetailStudent">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main flex ">
        <div className="left w-72">
          <Sidebar />
        </div>

        <div className="right mt-24 m-2  w-full  justify-between pr-24 p-2 flex ">
          <div className="flex flex-col gap-2">
            <span className="text-3xl mb-8 mt-8 text-center">
              New Requests{" "}
            </span>
            <div class="container mx-auto flex items-center justify-center">
              {filteredEmployees?.length > 0 ? (
                <table class="table-auto">
                  <thead>
                    <tr>
                      <th class="px-4 py-2">Project Title</th>
                      <th class="px-4 py-2">Admin Student</th>

                      <th class="px-4 py-2">Accept</th>
                      <th class="px-4 py-2">Delete</th>
                      <th class="px-4 py-2">View More</th>
                    </tr>
                  </thead>
                  {filteredEmployees?.map((x) => (
                    <tbody>
                      <tr>
                        <td class="border px-8 py-2">{x?.project?.title}</td>

                        <td class="border px-8 py-2">
                          {x?.project?.admin_student_email}
                        </td>
                        <td
                          onClick={() => {
                            console.log("clicked");
                            handleAccept("ACCEPTED", x);
                          }}
                          class="border px-8 py-2 hover:bg-green-600 hover:text-white cursor-pointer"
                        >
                          Accept
                        </td>
                        <td
                          onClick={() => {
                            console.log("clicked");
                            handleAccept("DELETED", x);
                          }}
                          class="border px-8 py-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        >
                          Delete
                        </td>
                        <td class="border px-8 py-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                          view more
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              ) : (
                <div>
                  <span>Sorry no Request was found </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
export default SupervisingRequestComp;
