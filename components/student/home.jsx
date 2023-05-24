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

import {
  AddSupervisor,
  fetch_students_of_group,
} from "../../redux/features/coordinator/coordinator_slice";
import { EmployeeRole } from "@prisma/client";

import Presentation from "./presentation/presentation";
import {
  fetchStudents,
  fetProject,
  addStudentByAdminStudent,
  clearAddingStudentError,
  removeStudentByAdminStudent,
} from "../../redux/features/student/studentSlice";

const Student_home = () => {
  const { data: session } = useSession();
  const { projectId, reg_no } = session.user;
  const [addStudent, setAddStudent] = useState(false);
  const [addingStudent_reg_no, setAddingStudent_reg_no] = useState("");
  const [addingSuperVisorEmail, setAddingSuperVisorEmail] = useState("");
  const { render } = useContext(NavbarContext);
  const dispatch = useDispatch();
  console.log("student");
  const student = useSelector((state) => state.student.student);
  console.log("project");
  const myProject = useSelector((state) => state.student?.projects);
  const addingStudentError = useSelector(
    (state) => state.student?.addingStudentByStudentError
  );
  console.log(addingStudentError);
  console.log("this is my project ");
  console.log(myProject);
  console.log(student);
  const data2 = {
    projectId: projectId,
    reg_no: reg_no,
  };
  useEffect(() => {
    dispatch(fetchProject(projectId));
  }, []);
  useEffect(() => {
    dispatch(fetProject(projectId));
  }, []);
  console.log(projectId);
  const handleAddingSupervisor = (e) => {
    e.preventDefault();
    if (addingSuperVisorEmail) {
      const data3 = {
        employee_email: addingSuperVisorEmail,
        projectId,
        role: EmployeeRole.ADVISOR,
      };
      dispatch(AddSupervisor(data3));
    }
  };
  useEffect(() => {
    dispatch(fetchStudents(reg_no));
  }, []);
  const handleAddingStudent = () => {
    if (addingStudent_reg_no && projectId) {
      const data = {
        reg_no: addingStudent_reg_no,
        projectId: projectId,
      };
      dispatch(addStudentByAdminStudent(data));
      setAddingStudent_reg_no("");
      setAddStudent(false);
    } else {
      alert("plz write reg no");
    }
  };
  useEffect(() => {
    console.log("I am called");
    const timer = setTimeout(() => {
      console.log("I am called after 3 seconds");
      dispatch(clearAddingStudentError(""));
    }, 5000);
    return () => clearTimeout(timer);
  }, [addingStudentError, dispatch]);
  // const handleRemovingStudent = (reg_no) => {
  //   if (reg_no && projectId) {
  //     const data = {
  //       reg_no: reg_no,
  //       projectId: projectId,
  //       remove: true,
  //     };
  //     dispatch(removeStudentByAdminStudent(data));
  //   } else {
  //     alert("plz write reg no");
  //   }
  // };
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div>
        {myProject !== null ? (
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
                        {myProject?.title}
                      </span>
                    </div>

                    <div className="flex gap-24 items-center">
                      <span className="text-blue-200 flex-1 text-2xl">
                        Coordinator Approval
                      </span>
                      <span className="flex-1 items-start flex justify-start">
                        {myProject?.status}
                      </span>
                    </div>
                    <div className="flex gap-24 items-center">
                      <span className="text-blue-200 text-2xl flex-1">
                        Admin Student
                      </span>
                      <span className="flex-1 items-start flex">
                        {myProject?.admin_student_email}
                      </span>
                    </div>
                    <div className="flex gap-24 items-center">
                      <span className="text-blue-200 flex-1 text-2xl">
                        Co Supervisor email
                      </span>{" "}
                      {/* <span className="flex-1">
                      {supervisor === null ? (
                        <div className="flex">
                          <input
                            className="p-2  rounded-lg text-black outline-blue-400"
                            placeholder="add Supervisor Email"
                            value={employee_email}
                            onChange={(e) => setEmployee_email(e.target.value)}
                          />
                          <button
                            onClick={(e) => handleAddingSupervisor(e)}
                            className="bg-slate-600 p-2 text-blue-200 rounded-lg"
                          >
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
                    </span> */}
                    </div>
                    <div className="flex gap-24 items-center">
                      <span className="text-blue-200 flex-1 text-2xl">
                        {" "}
                        Supervisor email
                      </span>{" "}
                      <span className="pl-4 flex flex-1">
                        {myProject?.employee === null ? (
                          <div className="">
                            <input
                              className="p-2 flex items-start text-black rounded-lg outline-blue-400"
                              placeholder="add supervisor email"
                              value={addingSuperVisorEmail}
                              onChange={(e) =>
                                setAddingSuperVisorEmail(e.target.value)
                              }
                            />
                            <button
                              onClick={(e) => handleAddingSupervisor(e)}
                              className="bg-slate-600 p-2 text-blue-200 rounded-lg"
                            >
                              submit
                            </button>
                          </div>
                        ) : (
                          <div>
                            <span className="flex-1 items-center flex justify-center">
                              {myProject.employee
                                ? myProject?.employee[0]?.employee_email
                                : ""}
                            </span>
                            <span>
                              {myProject?.supervisor_accepted ? (
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
                  <span className="pl-12 text-xl">
                    {myProject?.description}
                  </span>
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
                      <th className="border text-center p-2">Remove</th>
                    </tr>
                    {myProject?.students?.map((x) => (
                      <StudentList
                        onEdit={() => {
                          console.log(x.reg_no);
                          setEdit(true);
                        }}
                        student={x}
                        projectId={projectId}
                        reg_no={x.reg_no}
                      />
                    ))}
                  </tbody>
                </table>{" "}
                <div className="addStudent flex flex-col w-1/4 gap-2 p-2">
                  {addingStudentError && <span>{addingStudentError}</span>}
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
                      {addingStudentError && <span>{addingStudentError}</span>}
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
              </div>
            ) : (
              ""
            )}
            {render === "Presentation" ? <Presentation /> : ""}
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
          </div>
        ) : (
          <span>Loading</span>
        )}
      </div>
    </div>
  );
};
export default Student_home;
