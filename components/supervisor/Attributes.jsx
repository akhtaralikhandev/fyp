import { useContext, useState } from "react";
import { StudentGroupContext } from "../../context/StudentGroup";
import StudentList from "./groutStudentList";
const Attriubtes = ({ onDelete, group, onSubmit, onEdit }) => {
  const { editRegNo, setEditRegNo } = useContext(StudentGroupContext);
  return (
    <tr className="studentlist_tr text-black">
      <td className="border  cursor-pointer  text-xl p-2">{group.text}</td>
      <td className="border  cursor-pointer text-center p-2">
        {group.involved}
      </td>
    </tr>
  );
};
export default Attriubtes;
