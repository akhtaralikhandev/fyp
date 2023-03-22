import { useEffect, useState } from "react";
import { createProject, joinProject } from "../../lib/project/create";
import { signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProjects,
  fetch_students_of_group,
} from "../../redux/features/coordinator/coordinator_slice";
import axios from "axios";
import { joinRequests } from "../../redux/features/student/studentSlice";
import { EmployeeRole } from "@prisma/client";
export const options = [
  { value: "FME", label: "FME" },
  { value: "FCSE", label: "FCSE" },
  { value: "FEE", label: "FEE" },
];
export const sdgList = [
  { id: 1, text: "first sdg", mapped: false },
  { id: 2, text: "first sdg", mapped: false },
  { id: 3, text: "first sdg", mapped: false },
  { id: 4, text: "first sdg", mapped: false },
];
export const attributes = [
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
const CreateOrJoinGroup = () => {
  const [title, setTitle] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [description, setDescription] = useState("");
  const [department_name, setDepartment_name] = useState("");
  const [supervisor_email, setSupervisor_email] = useState("");
  const [coSuperVisor_email, setCoSupervisor_email] = useState("");
  const [join, setJoin] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [response2, setResponse2] = useState("");
  const [error2, setError2] = useState("");
  const user_email = useSelector((state) => state.user.user.email);
  const reg_no = useSelector((state) => state.user.user.reg_no);
  const department_name2 = useSelector(
    (state) => state.user.user.department_name
  );
  console.log(department_name2);
  const projects = useSelector((state) => state.coordinator.projects.projects);
  console.log("projects");
  console.log(projects);
  const students_of_group = useSelector((state) => state.coordinator.students);
  console.log(students_of_group);
  const dispatch = useDispatch();
  console.log(projects);
  console.log(user_email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      department_name: department_name,
      student_email: user_email,
      supervisor_email: supervisor_email,
      coSuperVisor_email: coSuperVisor_email,
      EmployeeRole: {
        superVisor: EmployeeRole.ADVISOR,
        coSuperVisor: EmployeeRole.CO_ADVISOR,
      },
      SDG: true,
      attributes: true,
      status: "PENDING",
    };
    try {
      const resp = await createProject(data)
        .then((data) => {
          setResponse(data);
          console.log(data);
        })
        .catch((error) => {
          setResponse(error);
          console.log(error);
        });
      setResponse(resp);
    } catch (error) {
      setError(error);
    }
  };
  const handleSubmit_2 = async (e) => {
    e.preventDefault();
    try {
      const resp = await joinProject({
        projectId: joinCode,
        email: user_email,
      });
      setResponse2(resp);
    } catch (error) {
      setError2(error);
    }
  };
  const createRequest = (projectId) => {
    const data = {
      reg_no: reg_no,
      projectId: projectId,
    };
    dispatch(joinRequests(data));
  };

  useEffect(() => {
    dispatch(fetchProjects(department_name2));
    console.log("useEffect calledd");
  }, []);
  useEffect(() => {
    projects.forEach((project) => {
      console.log(project.id);
      dispatch(fetch_students_of_group(project.id));
    });
  }, [projects]);

  return (
    <div className="createOrJoinGroup bg-slate-800">
      <div className="createOrJoin_wrapper  pt-12 flex w-2/3 justify-center xl:pl-24  gap-4 flex-col">
        <div className="flex gap-8 ">
          <span
            className="bg-slate-700 rounded-xl text-white cursor-pointer p-2"
            onClick={() => setJoin(true)}
          >
            Join Group
          </span>
          <span
            className="bg-slate-700 rounded-xl cursor-pointer text-white p-2"
            onClick={() => setJoin(false)}
          >
            Create Group
          </span>
        </div>
        {join ? (
          <div className="flex flex-col gap-4 ">
            <input
              value={joinCode}
              placeholder="group code"
              className=" border-2 p-2  outline-blue-600 rounded-xl"
              onChange={(e) => setJoinCode(e.target.value)}
            />

            <button
              onClick={(e) => handleSubmit_2(e)}
              className="bg-slate-700 p-2 rounded-xl text-white"
            >
              Submit
            </button>
            <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
              <tbody>
                <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                  <th className="border text-center p-2">Group Id</th>
                  <th className="border text-center p-2">Title</th>
                  <th className="border text-center p-2">Supervisor Email</th>
                  <th className="border text-center p-2">Total Students</th>
                  <th className="border text-center p-2">Join Request</th>
                </tr>
                {projects?.map((x) => (
                  <tr className="studentlist_tr text-black">
                    <td className="border  cursor-pointer  text-xl p-2">
                      {x.id}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      {x.title}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      {x.supervisor_email}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      {x.numberOfStudents}
                    </td>
                    <td
                      onClick={() => createRequest(x.id)}
                      className="border  cursor-pointer hover:bg-blue-500 bg-blue-600 text-white text-center p-2"
                    >
                      Join Request
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="project title"
              className=" border-2 p-2 w-96 outline-blue-600 rounded-xl"
            />{" "}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="write description"
              className=" border-2 p-2 resize-none  outline-blue-600 rounded-xl"
              cols={10}
              rows={10}
            />
            <input
              value={supervisor_email}
              defaultValue={EmployeeRole.ADVISOR}
              onChange={(e) => setSupervisor_email(e.target.value)}
              placeholder="Supervisor email"
              className=" border-2 p-2 w-96 outline-blue-600 rounded-xl"
            />
            <input
              value={coSuperVisor_email}
              onChange={(e) => setCoSupervisor_email(e.target.value)}
              placeholder="Co-Supervisor email"
              className=" border-2 p-2 w-96 outline-blue-600 rounded-xl"
              defaultValue={EmployeeRole.CO_ADVISOR}
            />
            <select
              id="department_name"
              name="department_name"
              className="p-3 outline-blue-500"
              defaultValue={"FME"}
              value={department_name}
              onChange={(e) => setDepartment_name(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
              <tbody>
                <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                  <th className="border text-center p-2">S#</th>
                  <th className="border text-center p-2">SDG</th>
                  <th className="border text-center p-2">Mapped (yes/no)</th>
                </tr>
                {sdgList?.map((x) => (
                  <tr className="studentlist_tr text-black">
                    <td className="border  cursor-pointer text-center p-2">
                      {x.id}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      {x.text}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      <div className="wrapper">
                        <input type="checkbox" className=" h-7  w-7" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="wrapper flex flex-col gap-4 text-white xl:mt-24">
              <span className="text-4xl flex items-center justify-center ">
                FINAL YEAR PROJECT AS A COMPLEX ENGINEERING/COMPUTING PROBLEM
              </span>
              <span className="text-xl w-1/2">
                It is to certify here that the final year design project (FYDP)
                entitled,
                <span className=" underline text-4xl  font-bold">
                  {" "}
                  {title}
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
                    <tr className="studentlist_tr text-black">
                      <td className="border  cursor-pointer  text-xl p-2">
                        {x.text}
                      </td>
                      <td className="border  cursor-pointer text-center p-2">
                        <input type="checkbox" className="h-7 w-7" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                className="bg-slate-700 p-2 rounded-xl text-white"
                onClick={(e) => handleSubmit(e)}
              >
                submit
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        className="absolute bg-white top-5 right-5"
        onClick={() => signOut()}
      >
        sign out
      </button>
    </div>
  );
};

export default CreateOrJoinGroup;
