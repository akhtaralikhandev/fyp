import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import StudentList from "./groupStudentList";
import axios from "axios";
import AddForm from "./addForm";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EmployeeRole } from "@prisma/client";

import { NavbarContext } from "../navbarContext";
import Presentation from "../presentation/presentation";
import {
  AddStudentFromProjectByCoordinator,
  deleteProject,
  handleProjectApproval,
} from "../../../redux/features/coordinator/coordinator_slice";
import DeleteConfirmation from "../confirmation/confirm";

const Student_home = () => {
  const { data: session } = useSession();

  const [addingStudent_reg_no, setAddingStudent_reg_no] = useState("");
  const [addStudent, setAddStudent] = useState(false);
  const projectId = useSelector((state) => state.student.projectId);
  const { render } = useContext(NavbarContext);
  const dispatch = useDispatch();
  console.log(render);
  const [employee_email, setEmployee_email] = useState("");
  console.log("coordinator");
  const projects = useSelector((state) => state.coordinator.projects.projects);
  console.log("all project from coordinator slice");
  console.log(projects);
  console.log("these are the thisProject ");
  const thisProject = projects.filter((x) => x.id === projectId)[0];
  console.log("this project");
  console.log(thisProject);
  console.log("project id is this one");
  console.log(projectId);
  console.log(thisProject.students.length);
  const [recommend, setRecommend] = useState(false);
  const [add, setadd] = useState(true);
  const [status, setStatus] = useState("");
  const HandleProjectApproval = () => {
    if (status && projectId) {
      const data = {
        status: status,
        projectId: projectId,
      };
      dispatch(handleProjectApproval(data));
    }
  };
  const handleAddingStudent = (e) => {
    e.preventDefault();
    if (projectId && addingStudent_reg_no) {
      const data = {
        reg_no: addingStudent_reg_no,
        projectId: projectId,
      };
      dispatch(AddStudentFromProjectByCoordinator(data));
      setAddingStudent_reg_no("");
      setAddStudent(false);
    } else {
      alert("plz write reg no");
    }
  };

  return (
    <div>
      <div>
        <div className="student_home p-8 pt-0 bg-slate-700 flex flex-col gap-3 text-white">
          <div className="flex flex-col items-center">
            <div>
              <div className="flex flex-col gap-8  xl:p-12 ">
                <div className="flex gap-24 items-center">
                  <span className="xl:text-4xl flex-1 text-blue-200 font-bold">
                    Title :{" "}
                  </span>
                  <span className="text-xl flex   items-start flex-1">
                    {thisProject?.title}
                  </span>
                </div>

                <div className="flex gap-24 items-center">
                  <span className="text-blue-200 flex-1 text-2xl">
                    Coordinator Approval
                  </span>
                  <span className=" items-start flex justify-start">
                    {thisProject?.status === "PENDING" ? (
                      <div className="flex gap-12">
                        <span>{thisProject?.status}</span>
                        <span
                          onClick={() => {
                            setStatus("ACCEPTED");
                            HandleProjectApproval();
                          }}
                          className="bg-green-700 hover:bg-green-500 cursor-pointer text-white p-2 rounded-lg"
                        >
                          Accept
                        </span>
                        <span
                          onClick={() => setRecommend(!recommend)}
                          className={
                            recommend
                              ? "bg-red-600 hover:bg-red-500 cursor-pointer text-white p-2 rounded-lg"
                              : "bg-blue-600 hover:bg-blue-500 cursor-pointer text-white p-2 rounded-lg"
                          }
                        >
                          {recommend ? (
                            <span> Cancel</span>
                          ) : (
                            <span>Recommend furthur work</span>
                          )}
                        </span>
                      </div>
                    ) : (
                      thisProject?.status
                    )}
                  </span>
                </div>
                <div className="flex gap-24 items-center flex-col ">
                  {recommend && (
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="p-2 outline-blue-700 resize-none text-black"
                        name=""
                        id=""
                        cols="60"
                        rows="10"
                      ></textarea>{" "}
                      <button className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-500">
                        submit
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-24 items-center">
                  <span className="text-blue-200 text-2xl flex-1">
                    Admin Student
                  </span>
                  <span className="flex-1 items-start flex">
                    {thisProject?.admin_student_email}
                  </span>
                </div>
                <div className="flex gap-24 items-center">
                  <span className="text-blue-200 flex-1 text-2xl">
                    Co Supervisor email
                  </span>{" "}
                  <span className="flex-1">
                    <div>
                      <span className="flex-1 items-start flex">
                        {thisProject?.coSuperVisor_email}
                      </span>
                      <span className="flex-1">
                        {thisProject?.coSuperVisor_accepted ? (
                          <p>Accepted</p>
                        ) : (
                          "Pending"
                        )}
                      </span>
                    </div>
                  </span>
                </div>
                <div className="flex gap-24 items-center">
                  <span className="text-blue-200 flex-1 text-2xl">
                    {" "}
                    Supervisor email
                  </span>{" "}
                  <span className="pl-4 flex flex-1">
                    {thisProject?.supervisor_email === null ? (
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
                          {thisProject?.employee[0]?.employee_email}
                        </span>
                        <span>
                          {thisProject?.supervisor_accepted ? (
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
              <span className="pl-12 text-xl">{thisProject?.description}</span>
            </div>
          </div>
          {thisProject.Presentation_Scedule !== null ? (
            <div>
              <span className="flex items-center justify-center text-4xl underline">
                Presentation Info
              </span>
              <div className="flex flex-col items-center">
                <div>
                  <div className="flex flex-col gap-8  xl:p-12 ">
                    <div className="flex gap-24 items-center">
                      <span className="text-blue-200 flex-1 text-2xl">
                        Date
                      </span>
                      <span className="text-xl flex   items-start flex-1">
                        {thisProject?.Presentation_Scedule?.date}
                      </span>
                    </div>

                    <div className="flex gap-24 items-center">
                      <span className="text-blue-200 flex-1 text-2xl">
                        Venue
                      </span>
                      <span className="flex-1 items-start flex justify-start">
                        {thisProject?.Presentation_Scedule.venue}
                      </span>
                    </div>

                    <div className="flex gap-24 items-center">
                      <span className="text-blue-200 flex-1 text-2xl">
                        Status
                      </span>
                      <span className="text-xl flex   items-start flex-1">
                        {thisProject?.Presentation_Scedule?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex mt-8 mb-8 flex-col items-center justify-center gap-4">
              <span>No presentation found </span>
              <span className="bg-green-700 p-2 cursor-pointer hover:bg-green-500 rounded-lg text-white">
                Add Presentation
              </span>
              {add ? (
                <div>
                  <input
                    type="text"
                    placeholder="write venue here"
                    className="p-2 rounded-lg "
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          <span className="flex items-center justify-center text-4xl underline">
            Student List
          </span>
          <div className="div_home_table_student">
            {thisProject?.students?.length > 0 ? (
              <>
                <table className="table  mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
                  <tbody>
                    <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                      <th className="border text-center p-2">Student Reg No</th>
                      <th className="border text-center p-2">Name</th>
                      <th className="border text-center p-2">Contact No</th>
                      <th className="border text-center p-2">email</th>
                      <th className="border text-center p-2">Edit/delete</th>
                    </tr>

                    {thisProject?.students?.map((x) => (
                      <StudentList
                        projectId={thisProject?.id}
                        onEdit={() => {
                          console.log(x.reg_no);
                        }}
                        student={x}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="addStudent flex flex-col w-1/4 gap-2 p-2">
                  <button
                    onClick={() => setAddStudent(!addStudent)}
                    className={
                      addStudent
                        ? `bg-red-700 text-white rounded-lg cursor-pointer p-2 hover:bg-red-500`
                        : `bg-green-700 text-white rounded-lg cursor-pointer p-2 hover:bg-green-500`
                    }
                  >
                    {addStudent ? "Cancel" : "Add Student"}
                  </button>
                  {addStudent && (
                    <>
                      {" "}
                      <input
                        type="text"
                        value={addingStudent_reg_no}
                        className="text-black p-2 rounded-lg"
                        onChange={(e) =>
                          setAddingStudent_reg_no(e.target.value)
                        }
                        placeholder="Write student reg no"
                      />
                      <button
                        className="bg-green-700 text-white p-2 rounded-lg cursor-pointer hover:bg-green-500"
                        onClick={(e) => handleAddingStudent(e)}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>No student found in this project</span>
                <div className="addStudent flex flex-col">
                  <button>Add Student</button>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={addingStudent_reg_no}
                      onChange={(e) => setAddingStudent_reg_no(e.target.value)}
                      placeholder="Write student reg no"
                      className="text-black"
                    />
                    <button onClick={(e) => handleAddingStudent(e)}>
                      Submit
                    </button>
                  </div>
                </div>
                <DeleteConfirmation
                  postId={thisProject?.id}
                  onDelete={() => console.log("clicked")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Student_home;
