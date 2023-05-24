import { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { fetchProjects } from "../../redux/features/coordinator/coordinator_slice";
import ProjectList from "./projectList";
import Navbar from "./navbar";
import Sidebar from "./sidebar/panelSidebar";
import ProjectCard from "./projectCard/projectCard";
const AllProjects = () => {
  const { data: session } = useSession();
  const projects = useSelector((state) => state.coordinator.projects.projects);
  console.log("these are all projects");
  console.log(projects);
  const coordinator_depart = session?.user?.coordinator_depart;
  const email = session?.user?.email;
  const department_name = session?.user?.department_name;
  const dispatch = useDispatch();
  console.log(email);
  useEffect(() => {
    console.log("callled");
    dispatch(fetchProjects(coordinator_depart));
  }, []);
  return (
    <div className="allProjectsList2">
      <Navbar />
      <div className="div flex">
        <div className="allProjectsList2Left fixed top-0 ">
          <Sidebar />
        </div>
        <div className="allProjectsListCards pl-64">
          <div className="allProjectsListCardsWrapper flex gap-8 flex-wrap">
            {projects?.map((x) => (
              <ProjectCard project={x} />
            ))}
          </div>
        </div>

        {/* <div className="allProjectsList2Right flex flex-col gap-12 pl-64">
          <div>
            <span className="text-3xl  text-blue-900 font-bold "></span>
          </div>

          <table className="table  w-full   border-collapse border-slate-500  ">
            <tbody>
              <tr className="  border-blue-500 text-3xl">
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
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default AllProjects;
