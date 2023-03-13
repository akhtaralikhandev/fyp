import { useContext, useState, useEffect } from "react";

import { StudentGroupContext } from "../../context/StudentGroup";
import SDG from "./SDG";

import { useSelector, useDispatch } from "react-redux";
import {
  setIndex,
  removeStudent,
} from "../../redux/features/coordinator/coordinator_slice";
import {
  fetch_students_of_group,
  handleProjectApproval,
  handleStudentRemoval,
  handleAddingStudent,
  updateProjectStatus,
  fetchProjects,
} from "../../redux/features/supervisor/supervisorSlice";
import axios from "axios";
import StudentList from "./groutStudentList";
import EditGroupStudent from "./editGroupStudent";
import Attriubtes from "./Attributes";
const sdgList = [
  { id: 1, text: "first sdg", mapped: false },
  { id: 2, text: "first sdg", mapped: false },
  { id: 3, text: "first sdg", mapped: false },
  { id: 4, text: "first sdg", mapped: false },
];
const attributes = [
  {
    text: "Involves wide-ranging or conﬂictintechnical, computing/engineering and otherissues",
    involved: "yes",
  },
  {
    text: `Have no obvious solution and require abstract thinking and originality in analysis to formulate suitable models`,
    involved: "yes",
  },
  {
    text: "Involve infrequently encountered issues",
    involved: "yes",
  },
  {
    text: "Outside problems encompassed by standards and codes of practice for professional engineering",
    involved: "yes",
  },
  {
    text: "Involve diverse groups of stakeholders with widely varying needs",
    involved: "yes",
  },
  {
    text: "High level problems including many component parts or sub-problems",
    involved: "yes",
  },
];
const Group = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const students_of_group = useSelector((state) => state.coordinator.students);
  const projects = useSelector((state) => state.coordinator.projects);
  console.log(projects);
  const projectId = useSelector((state) => state.coordinator.index);
  const user = useSelector((state) => state.user.user);
  console.log(user);
  console.log("project id");
  console.log(projectId);
  const project = projects.filter((x) => x.id === projectId);
  console.log(project[0]);
  console.log(students_of_group);
  const [status, setStatus] = useState("");
  const [adding_reg_no, setAdding_reg_no] = useState("");
  const [add, setAdd] = useState(false);
  const [supervisor_accepted, setSupervisor_accepted] = useState(false);
  useEffect(() => {
    dispatch(fetch_students_of_group(projectId));
  }, []);
  useEffect(() => {
    dispatch(fetchProjects(user.email));
  }, []);
  useEffect(() => {
    if (status === "ACCEPTED") {
      setSupervisor_accepted(true);
    } else {
      setSupervisor_accepted(false);
    }
  }, [status]);
  const Approval = () => {
    if (projectId && status) {
      if (status == "ACCEPTED") {
        setSupervisor_accepted(true);
        console.log(supervisor_accepted);
      }
      const data = {
        projectId: projectId,
        status: status,
        supervisor_accepted: supervisor_accepted,
      };
      dispatch(handleProjectApproval(data));

      dispatch(updateProjectStatus(data));
      setSupervisor_accepted(false);
    }
  };
  const ToggleAdd = () => {
    if (add === false) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  };
  const confirmDelete = (reg_no) => {
    if (window.confirm("Delete student")) {
      dispatch(handleStudentRemoval(reg_no));
      dispatch(removeStudent(reg_no));
    }
  };

  const AddStudent = () => {
    if (adding_reg_no && projectId) {
      const data = { reg_no: adding_reg_no, projectId: projectId };
      dispatch(handleAddingStudent(data));
      setAdding_reg_no("");
    }
  };
  return (
    <>
      {edit ? (
        <EditGroupStudent />
      ) : (
        <div className="bg-slate-700 text-white">
          <div className="wrapper_table p-4 ">
            <div className="div flex  justify-between">
              <div className="flex flex-col gap-3">
                <span className="xl:text-3xl text-slate-700">
                  project Id : {project[0]?.id}
                </span>
                <span>Title: {project[0]?.title}</span>
                <span>status: {project[0]?.status}</span>
                <span>description: {project[0]?.description}</span>
              </div>
              <div className=" text-black flex flex-col gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  name=""
                  className="p-2 rounded-lg"
                  id=""
                >
                  {/*  PENDING
  Recommend_further_work
  APPROVED
  COMPLETED */}
                  <option value="PENDING">PENDING</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>{" "}
                {status === "Recommend_further_work" && (
                  <textarea placeholder="write furthur recommended work here" />
                )}
                <button
                  className="bg-slate-500 text-white p-2 rounded-lg hover:bg-slate-600"
                  onClick={(e) => {
                    console.log("clicked");
                    Approval();
                  }}
                >
                  submit
                </button>
              </div>
            </div>
            <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
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
            </table>
            <div className="flex flex-col gap-2 w-64">
              <button
                onClick={() => ToggleAdd()}
                className="bg-slate-500 text-white p-2 mt-2 rounded-lg hover:bg-slate-600"
              >
                {add ? <p>cancel</p> : <p>add student</p>}
              </button>
              {add && (
                <div className="flex flex-col gap-2">
                  <input
                    placeholder="reg no"
                    className="p-2 text-black rounded-lg outline-blue-500"
                    value={adding_reg_no}
                    onChange={(e) => setAdding_reg_no(e.target.value)}
                  />
                  <button
                    onClick={() => AddStudent()}
                    className="bg-slate-500 text-white p-2 rounded-lg hover:bg-slate-600"
                  >
                    submit
                  </button>
                </div>
              )}
            </div>
            <div className="work_plan mt-10 ">
              <span className="text-3xl flex items-center justify-center">
                Work Plan
              </span>
              <div className="bg-slate-500 flex-col p-8 pl-4 flex rounded-lg  items-center gap-4">
                <span>
                  Term1 (7<sup>th</sup>)
                </span>
                <span>
                  Term2 (8<sup>th</sup>)
                </span>
              </div>
            </div>
            <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
              <tbody>
                <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                  <th className="border text-center p-2">S#</th>
                  <th className="border text-center p-2">SDG</th>
                  <th className="border text-center p-2">Mapped (yes/no)</th>
                </tr>
                {sdgList?.map((x) => (
                  <SDG group={x} />
                ))}
              </tbody>
            </table>
            <div>
              <div className="wrapper flex flex-col gap-4 xl:mt-24">
                <span className="text-4xl flex items-center justify-center w-1/2">
                  FINAL YEAR PROJECT AS A COMPLEX ENGINEERING/COMPUTING PROBLEM
                </span>
                <span className="text-xl w-1/2">
                  It is to certify here that the final year design project
                  (FYDP) entitled,
                  <span className=" underline text-4xl  font-bold">
                    {" "}
                    {project[0].title}
                  </span>{" "}
                  <span> </span>
                  categorized as a complex engineering/computing problem (CEP)
                  based on the preamble (in-depth engineering knowledge) and
                  involvement of the following attributes.
                </span>
                <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
                  <tbody>
                    <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                      <th className="border text-center p-2">Attributes</th>
                      <th className="border text-center p-2">
                        Involved (yes/no)
                      </th>
                    </tr>
                    {attributes?.map((x) => (
                      <Attriubtes group={x} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Group;
