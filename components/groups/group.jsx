import { useContext, useState } from "react";
import StudentList from "./groupStudentList";
import { StudentGroupContext } from "../../context/StudentGroup";
import EditGroupStudent from "./editGroupStudent";

const Group = () => {
  const [edit, setEdit] = useState(false);
  const { studentList, setStudentList } = useContext(StudentGroupContext);
  console.log(studentList);
  const handleDelete = (regNo) => {
    setStudentList((students) => students.filter((x) => x.regNo !== regNo));
  };
  return (
    <>
      {edit ? (
        <EditGroupStudent />
      ) : (
        <div>
          <div className="wrapper_table p-4 ">
            <span className="xl:text-3xl text-slate-700">Group Id : 2343</span>
            <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
              <tbody>
                <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                  <th className="border text-center p-2">Student Reg No</th>
                  <th className="border text-center p-2">Name</th>
                  <th className="border text-center p-2">Edit/delete</th>
                </tr>
                {studentList.map((x) => (
                  <StudentList
                    onEdit={() => {
                      console.log(x.regNo);
                      setEdit(true);
                    }}
                    onDelete={() => handleDelete(x.regNo)}
                    student={x}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Group;
