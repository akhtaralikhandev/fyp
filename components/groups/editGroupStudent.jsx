import { StudentGroupContext } from "../../context/StudentGroup";
import { useContext, useState } from "react";
import { EditContext } from "./editContext";
const EditGroupStudent = () => {
  const { studentList, setStudentList, editRegNo } =
    useContext(StudentGroupContext);
  const [studentName, setStudentName] = useState("");
  const [newRegNo, setNewRegNo] = useState("");
  const handleEdit = (regNo) => {
    setStudentList((prevItems) =>
      prevItems.map((x) => {
        if (x.regNo === regNo) {
          return { ...x, name: studentName };
        }
        return x;
      })
    );
    console.log(studentList);
    setNewRegNo("")
    setStudentName("")
  };

  return (
    <div className="edit_group_student xl:w-96">
      <div className="edit_group_student_wrapper flex flex-col gap-2  shadow-md p-4 m-4">
        <span>Make Changes here</span>{" "}
        <input
          type="text"
          className="border p-2 rounded-lg outline-blue-700"
          value={newRegNo}
          onChange={(e) => setNewRegNo(e.target.value)}
          placeholder="Reg No"
        />
        <input
          type="text"
          className="border  p-2 rounded-lg outline-blue-700"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button
          onClick={() => handleEdit(editRegNo)}
          className="bg-slate-700 hover:bg-slate-500 text-white p-2 text-xl rounded-xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditGroupStudent;
