import { useState } from "react";
import { createProject, joinProject } from "../../lib/project/create";

const CreateOrJoinGroup = () => {
  const [title, setTitle] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [description, setDescription] = useState("");
  const [department_name, setDepartment_name] = useState("");
  const [student_email, setStudent_email] = useState("");
  const [student_email2, setStudent_email2] = useState("");
  const [join, setJoin] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({
      title: title,
      description: description,
      department_name: department_name,
      student_email: student_email,
    });
  };
  const handleSubmit_2 = (e) => {
    e.preventDefault();
    joinProject({
      projectId: Number(joinCode),
      email: student_email2,
    });
  };
  return (
    <div className="createOrJoinGroup bg-slate-800">
      <div className="createOrJoin_wrapper mt-24 flex items-center justify-center gap-4 flex-col">
        <div className="flex gap-8">
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
            <input
              value={student_email2}
              placeholder="student email"
              className=" border-2 p-2  outline-blue-600 rounded-xl"
              onChange={(e) => setStudent_email2(e.target.value)}
            />
            <button
              onClick={(e) => handleSubmit_2(e)}
              className="bg-slate-700 p-2 rounded-xl text-white"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="project title"
              className=" border-2 p-2  outline-blue-600 rounded-xl"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="write description"
              className=" border-2 p-2  outline-blue-600 rounded-xl"
            />
            <input
              value={department_name}
              onChange={(e) => setDepartment_name(e.target.value)}
              placeholder="department name"
              className=" border-2 p-2  outline-blue-600 rounded-xl"
            />
            <input
              value={student_email}
              onChange={(e) => setStudent_email(e.target.value)}
              placeholder="student email"
              className=" border-2 p-2  outline-blue-600 rounded-xl"
            />

            <button
              className="bg-slate-700 p-2 rounded-xl text-white"
              onClick={(e) => handleSubmit(e)}
            >
              submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOrJoinGroup;
