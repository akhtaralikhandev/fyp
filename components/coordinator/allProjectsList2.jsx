import { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { fetchProjects } from "../../redux/features/coordinator/coordinator_slice";
import ProjectList from "./projectList";

const AllProjects = () => {
  const { data: session } = useSession();
  const projects = useSelector((state) => state.coordinator.projects.projects);
  console.log(projects);
  const { email, department_name } = session.user;
  const dispatch = useDispatch();
  console.log(email);
  useEffect(() => {
    console.log("callled");
    dispatch(fetchProjects(department_name));
  }, []);
  return (
    <div>
      <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
        <tbody>
          <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
            <th className="border text-center p-2">Project Id</th>
            <th className="border text-center p-2">title</th>
            <th className="border text-center p-2">Group Leader</th>
            <th className="border text-center p-2">Total Students</th>
            <th className="border text-center p-2">View More</th>
          </tr>
          {projects?.map((x) => (
            <ProjectList
              onEdit={() => {
                console.log(x.id);
                setEdit(true);
              }}
              project={x}
              onDelete={() => {
                confirmDelete(x.id);
              }}
            />
          ))}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default AllProjects;
