import { useContext, useState } from "react";
import { StudentGroupContext } from "../../context/StudentGroup";
import { useRouter } from "next/router";
import { setProjectId } from "../../redux/features/student/studentSlice";
import { useDispatch } from "react-redux";

const ProjectList = ({ onDelete, project, onSubmit, onEdit }) => {
  const router = useRouter();
  const { editRegNo, setEditRegNo } = useContext(StudentGroupContext);
  const dispatch = useDispatch();
  const groupLeader = (email) => {
    return project.students.find((x) => x.email === email);
  };
  const handleClick = (id) => {
    dispatch(setProjectId(id));
    router.push("/coordinator/project");
  };
  console.log(groupLeader);
  return (
    <tr className="studentlist_tr text-black">
      <td className="border  cursor-pointer text-center p-2">{project.id}</td>
      <td className="border  cursor-pointer text-center p-2">
        {project.title}
      </td>
      <td className="border  cursor-pointer text-center p-2">
        {groupLeader(project.admin_student_email)?.name}
      </td>
      <td className="border  cursor-pointer text-center p-2">
        {project.students.length}
      </td>
      <td className="border flex gap-4 items-center justify-center cursor-pointer text-center p-2">
        <span
          onClick={() => handleClick(project.id)}
          className="bg-green-700 p-2 rounded-lg text-white cursor-pointer"
        >
          view more
        </span>
      </td>
    </tr>
  );
};
export default ProjectList;
