import { useContext, useState } from "react";
import { StudentGroupContext } from "../../../context/StudentGroup";
import DeleteConfirmation from "./deleteStudent/confrim";
import { useDispatch } from "react-redux";
import { updateStudentFromProjectByCoordinator } from "../../../redux/features/coordinator/coordinator_slice";
const StudentList = ({ onDelete, student, onSubmit, onEdit, projectId }) => {
  const [reg_no, setRegNo] = useState(student.reg_no);
  const [name, setName] = useState(student.name);
  const [contact_no, setContactNo] = useState(student.contact_no);
  const [email, setEmail] = useState(student.email);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    if (reg_no && name && contact_no && email) {
      const data = {
        reg_no: reg_no,
        name: name,
        email: email,
        contact_no: contact_no,
      };
      {
        dispatch(updateStudentFromProjectByCoordinator(data));
      }
    }
  };
  return (
    <>
      <tr className="studentlist_tr text-black">
        <td className="border  cursor-pointer text-center p-2">
          {student.reg_no}
        </td>
        <td className="border  cursor-pointer text-center p-2">
          {student.name}
        </td>
        <td className="border  cursor-pointer text-center p-2">
          {student.contact_no}
        </td>
        <td className="border  cursor-pointer text-center p-2">
          {student.email}
        </td>
        <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
          <DeleteConfirmation
            projectId={projectId}
            postId={student.reg_no}
            onDelete={() => console.log("deleted")}
          />
          {/* <span
            onClick={() => {
              onEdit(student.reg_no);
              setEdit(true);
            }}
            className="bg-slate-700 p-2 rounded-xl hover:bg-slate-500 text-white"
          >
            Edit
          </span> */}
        </td>
      </tr>
      {/* {edit && (
        <tr className="studentlist_tr text-black">
          <td className="border  cursor-pointer text-center p-2">
            <input
              type="text"
              onChange={(e) => setRegNo(e.target.value)}
              className="p-2 rounded-lg"
              value={reg_no}
            />
          </td>
          <td className="border  cursor-pointer text-center p-2">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-lg"
              value={name}
            />
          </td>
          <td className="border  cursor-pointer text-center p-2">
            <input
              type="text"
              onChange={(e) => setContactNo(e.target.value)}
              className="p-2 rounded-lg"
              value={contact_no}
            />
          </td>
          <td className="border  cursor-pointer text-center p-2">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-lg"
              value={email}
            />
          </td>
          <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
            <span
              onClick={() => handleUpdate()}
              className="bg-slate-700 p-2 rounded-xl hover:bg-slate-500 text-white"
            >
              Submit
            </span>
            <span
              onClick={() => {
                onEdit(student.reg_no);
                setEdit(false);
              }}
              className="bg-slate-700 p-2 rounded-xl hover:bg-slate-500 text-white"
            >
              Cancel
            </span>
          </td>
        </tr>
      )} */}
    </>
  );
};
export default StudentList;
