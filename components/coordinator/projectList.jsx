import { useContext, useState } from "react";
import { StudentGroupContext } from "../../context/StudentGroup";

const ProjectList = ({ onDelete, project, onSubmit, onEdit }) => {
  const { editRegNo, setEditRegNo } = useContext(StudentGroupContext);
  // const groupLeader = (email) => {
  //   return project.students.find((x) => x.email === email);
  // };

  // console.log(groupLeader);
  return (
    <tr className="studentlist_tr text-black">
      <td className="border  cursor-pointer text-center p-2">{project.id}</td>

      <td className="border  cursor-pointer text-center p-2">
        {project.title}
      </td>
      <td className="border  cursor-pointer text-center p-2">
        {/* {groupLeader(project.admin_student_email)?.name} */}
      </td>
      <td className="border  cursor-pointer text-center p-2">
        {project.numberOfStudents}
      </td>
      <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
        <span className="bg-green-700 p-2 rounded-lg text-white cursor-pointer">
          view more
        </span>
      </td>
    </tr>
  );
};
export default ProjectList;
