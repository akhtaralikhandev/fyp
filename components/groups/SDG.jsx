import { useContext, useState } from "react";
import { StudentGroupContext } from "../../context/StudentGroup";

const SDG = ({ onDelete, group, onSubmit, onEdit }) => {
  const { editRegNo, setEditRegNo } = useContext(StudentGroupContext);
  return (
    <tr className="studentlist_tr text-black">
      <td className="border  cursor-pointer text-center p-2">{group.id}</td>
      <td className="border  cursor-pointer text-center p-2">{group.text}</td>
      <td className="border  cursor-pointer text-center p-2">
        <div className="wrapper">
          <input type="checkbox" className=" h-7  w-7" />
        </div>
      </td>
    </tr>
  );
};
export default SDG;
