import { StudentGroupContext } from "../../context/StudentGroup";
import { useContext, useState } from "react";
import { EditContext } from "./editContext";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { handleEditingStudent } from "../../redux/features/coordinator/coordinator_slice";
const EditGroupStudent = () => {
  const { studentList, setStudentList, editRegNo } =
    useContext(StudentGroupContext);

  const dispatch = useDispatch();
  const router = useRouter();
  const students = useSelector((state) => state.coordinator.students);
  const student = students.filter((x) => x.reg_no === Number(editRegNo));
  console.log(student);
  const [studentName, setStudentName] = useState(student[0]?.name);
  const [contact_no, setContact_no] = useState(student[0]?.contact_no);
  const [email, setEmail] = useState(student[0]?.email);
  const [newRegNo, setNewRegNo] = useState(student[0]?.reg_no);
  const handleEdit = (regNo) => {
    setStudentList((prevItems) =>
      prevItems.map((x) => {
        if (x.regNo === regNo) {
          setEmail(x.email);
          return { ...x, name: studentName };
        }
        return x;
      })
    );
    console.log(studentList);
    setNewRegNo("");
    setStudentName("");
  };
  const handleEditSubmit = () => {
    if (studentName && newRegNo && contact_no && email) {
      const data = {
        name: studentName,
        reg_no: newRegNo,
        contact_no: contact_no,
        email: email,
      };
      dispatch(handleEditingStudent(data));
    }
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
        <input
          type="email"
          className="border p-2 rounded-lg outline-blue-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="text"
          className="border  p-2 rounded-lg outline-blue-700"
          placeholder="contact number"
          value={contact_no}
          onChange={(e) => setContact_no(e.target.value)}
        />
        <button
          onClick={() => handleEditSubmit()}
          className="bg-slate-700 hover:bg-slate-500 text-white p-2 text-xl rounded-xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditGroupStudent;
