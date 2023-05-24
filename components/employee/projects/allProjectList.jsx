import { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ProjectList from "./projectList";

const AllProjects = () => {
  const employee = useSelector((state) => state.employee.employee);
  console.log("Project employee working on ");
  console.log(employee);
  // projects employee working on
  const projects = useSelector((state) => state.employee.employee.projects);
  const { data: session } = useSession();

  return (
    <div>
      {projects?.length > 0 ? (
        <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">Project Id</th>
              <th className="border text-center p-2">title</th>
              <th className="border text-center p-2">Group Leader</th>
              <th className="border text-center p-2">Status</th>
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
        </table>
      ) : (
        <div className="flex items-center justify-center m-8 text-4xl italic text-slate-700">
          <span>Sorry Sir you are not working on any project yet</span>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
