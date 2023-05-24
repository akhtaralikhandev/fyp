import { fetchAllProjects } from "../../redux/features/project/projectSlice";
import Navbar from "./navbar/navbar";
import { useSession } from "next-auth/react";
import Sidebar from "./sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const FacultyHome = () => {
  const { data: session } = useSession();
  const [myProject, setProjects] = useState();
  const department_name = session?.user?.department_name;
  const email = session?.user?.email;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProjects(department_name));
  }, []);
  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:3000/api/employee/projects?employee_email=${email}`
        );
        console.log(resp);
        setProjects(resp.data);
        return resp.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProjects();
  }, []);
  console.log("these are the my projects");
  console.log(myProject);
  return (
    <div className="w-full">
      <div className="navbarSupervisioned">
        <Navbar />
      </div>
      <div className="mainbody flex ">
        <div className="leftside w-72">
          <Sidebar />
        </div>
        <div className="rightside mt-24 m-2 w-full">
          <span className="w-full mb-8 text-center text-4xl text-blue-800  flex items-center justify-center">
            Supervising Project are here
          </span>
          <>
            {myProject?.length > 0 ? (
              <div>
                <div className="mt-4 mb-4 w-full">
                  <span className="text-xl w-full  text-center flex items-center justify-center ">
                    Total Number of Presentations Assigned {myProject?.length}
                  </span>
                </div>

                <div className="flex mt-12 gap-8 flex-wrap">
                  {myProject?.map((x) => (
                    <Link href={`/employee/project/${x?.id}`}>
                      <div className=" shadow-lg p-8 gap-6 flex flex-col rotating-div rounded-lg cursor-pointer">
                        <div className="flex gap-8 items-center">
                          <span className="text-3xl flex-1 flex items-center text-blue-600 ">
                            Title
                          </span>{" "}
                          <span className="text-xl flex-1 flex items-center  ">
                            {x?.title}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-8 items-center">
                            <span className="text-xl flex-1 flex items-center text-blue-600 ">
                              Status
                            </span>{" "}
                            <span className="text-xl flex-1 flex items-center  ">
                              {x?.status}
                            </span>
                          </div>
                          <div className="flex gap-8 items-center">
                            <span className="text-xl flex-1 flex items-center text-blue-600 ">
                              Description
                            </span>{" "}
                            <span className="text-xl flex-1 flex items-center  ">
                              {x?.description}
                            </span>
                          </div>
                          <div className="flex gap-8 items-center">
                            <span className="text-xl flex-1 flex items-center text-blue-600 ">
                              Number of students
                            </span>{" "}
                            <span className="text-xl flex-1 flex items-center  ">
                              {x?.students?.length}
                            </span>
                          </div>
                          <div className="flex gap-8 items-center">
                            <span className="text-xl flex-1 flex items-center text-blue-600 ">
                              Presentation Number
                            </span>{" "}
                            <span className="text-xl flex-1 flex items-center  ">
                              {x?.Presentation_Scedule?.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <span>No presentation is assigned yet</span>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};
export default FacultyHome;
