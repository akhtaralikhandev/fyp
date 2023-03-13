import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import StudentList from "./groupStudentList";

import axios from "axios";
import AddForm from "./addForm";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavbarContext } from "./navbarContext";
import Navbar from "./navbar";
import Email from "../email/email";
import JoinRequest from "./joinRequests";
import EditPage from "./editPage";
import { options, sdgList, attributes } from "./createOrJoin";
import { fetchProject } from "../../redux/features/project/projectSlice";
const Student_home = () => {
  const { data: session } = useSession();
  const { render } = useContext(NavbarContext);
  const dispatch = useDispatch();
  console.log(render);
  const students_of_group = useSelector((state) => state.coordinator.students);
  const data = useSelector((state) => state.project.project);
  console.log(data);
  console.log(students_of_group);

  const { projectId, reg_no } = session.user;
  const data2 = {
    projectId: projectId,
    reg_no: reg_no,
  };
  useEffect(() => {
    dispatch(fetchProject(projectId));
  }, []);
  console.log(projectId);
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div>
        <div className="student_home p-8 pt-0 bg-slate-700 flex flex-col gap-3 text-white">
          {render === "Project Detail" ? (
            <div className="flex flex-col items-center">
              <div>
                <div className="flex flex-col gap-8  xl:p-12 ">
                  <div className="flex gap-24 items-center">
                    <span className="xl:text-4xl flex-1 text-blue-200 font-bold">
                      Title :{" "}
                    </span>
                    <span className="text-xl flex   items-start flex-1">
                      {data?.title}
                    </span>
                  </div>

                  <div className="flex gap-24 items-center">
                    <span className="text-blue-200 flex-1 text-2xl">
                      Coordinator Approval
                    </span>
                    <span className="flex-1 items-start flex justify-start">
                      {data?.status}
                    </span>
                  </div>
                  <div className="flex gap-24 items-center">
                    <span className="text-blue-200 text-2xl flex-1">
                      Admin Student
                    </span>
                    <span className="flex-1 items-start flex">
                      {data?.admin_student_email}
                    </span>
                  </div>
                  <div className="flex gap-24 items-center">
                    <span className="text-blue-200 flex-1 text-2xl">
                      Co Supervisor email
                    </span>{" "}
                    <span className="flex-1">
                      {data?.coSuperVisor_email === null ? (
                        <div className="flex">
                          <input
                            className="p-2  rounded-lg outline-blue-400"
                            placeholder="add Co-Supervisor email"
                          />
                          <button className="bg-slate-600 p-2 text-blue-200 rounded-lg">
                            submit
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span className="flex-1 items-start flex">
                            {data?.coSuperVisor_email}
                          </span>
                          <span className="flex-1">
                            {data?.coSuperVisor_accepted ? (
                              <p>Accepted</p>
                            ) : (
                              "Pending"
                            )}
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="flex gap-24 items-center">
                    <span className="text-blue-200 flex-1 text-2xl">
                      {" "}
                      Supervisor email
                    </span>{" "}
                    <span className="pl-4 flex flex-1">
                      {data?.supervisor_email === null ? (
                        <div className="">
                          <input
                            className="p-2 flex items-start rounded-lg outline-blue-400"
                            placeholder="add supervisor email"
                          />
                          <button className="bg-slate-600 p-2 text-blue-200 rounded-lg">
                            submit
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span className="flex-1 items-center flex justify-center">
                            {data?.supervisor_email}
                          </span>
                          <span>
                            {data?.supervisor_accepted ? (
                              <p>Accepted</p>
                            ) : (
                              "Pending"
                            )}
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center justify-center p-8 pt-0">
                <span className="text-blue-200  pl-12 pt-0 text-4xl">
                  Description
                </span>
                <span className="pl-12 text-xl">{data?.description}</span>
              </div>
            </div>
          ) : (
            ""
          )}
          {render === "Group Members" ? (
            <div className="div_home_table_student">
              <table className="table  mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
                <tbody>
                  <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                    <th className="border text-center p-2">Student Reg No</th>
                    <th className="border text-center p-2">Name</th>
                    <th className="border text-center p-2">Contact No</th>
                    <th className="border text-center p-2">email</th>
                    <th className="border text-center p-2">Edit/delete</th>
                  </tr>
                  {students_of_group?.map((x) => (
                    <StudentList
                      onEdit={() => {
                        console.log(x.reg_no);
                        setEdit(true);
                      }}
                      student={x}
                      onDelete={() => {
                        confirmDelete(x.reg_no);
                      }}
                    />
                  ))}
                </tbody>
              </table>{" "}
            </div>
          ) : (
            ""
          )}
          {render === "Add member" ? <Email /> : ""}
          {render === "join requests" ? <JoinRequest data={data2} /> : ""}
          {render === "AddForm" ? <AddForm /> : ""}
          {render === "Edit Project" ? (
            <EditPage
              options={options}
              sdgList={sdgList}
              attributes={attributes}
            />
          ) : (
            ""
          )}
        </div>{" "}
      </div>
    </div>
  );
};
export default Student_home;
