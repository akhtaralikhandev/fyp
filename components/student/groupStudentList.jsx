import { useContext, useState } from "react";
import { StudentGroupContext } from "../../context/StudentGroup";
import RemoveConfirmation from "./confirm/removeConfirm";

const StudentList = ({
  onDelete,
  student,
  reg_no,
  projectId,
  onSubmit,
  onEdit,
}) => {
  const { editRegNo, setEditRegNo } = useContext(StudentGroupContext);
  return (
    <tr className="studentlist_tr text-black">
      <td className="border  cursor-pointer text-center p-2">
        {student.reg_no}
      </td>
      <td className="border  cursor-pointer text-center p-2">{student.name}</td>
      <td className="border  cursor-pointer text-center p-2">
        {student.contact_no}
      </td>
      <td className="border  cursor-pointer text-center p-2">
        {student.email}
      </td>
      <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
        <RemoveConfirmation reg_no={reg_no} projectId={projectId} />
      </td>
    </tr>
  );
};
export default StudentList;
