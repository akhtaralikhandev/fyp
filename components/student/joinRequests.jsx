import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  fetchJoinRequests,
  fetchRequests,
} from "../../redux/features/student/studentSlice";
import { handleAddingStudent2 } from "../../redux/features/coordinator/coordinator_slice";
import axios from "axios";
const JoinRequest = ({ data }) => {
  const { data: session } = useSession();
  const { projectId, reg_no } = session.user;

  const joinRequests = useSelector(
    (state) => state.student.joinRequest[0]?.student
  );
  const id = useSelector((state) => state.student?.joinRequest[0]?.id);
  console.log("id from join requests");
  console.log(id);
  console.log("join requests");
  console.log(joinRequests);
  console.log("project id from join requests ");
  console.log(projectId);
  const [studentList, setStudentList] = useState([joinRequests]);
  console.log("student list is here ");
  console.log(studentList);
  console.log(joinRequests);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJoinRequests(projectId));
  }, []);
  const handleApproval = (reg_no) => {
    const data = {
      id: id,
      reg_no: reg_no,
      projectId: projectId,
    };
    dispatch(handleAddingStudent2(data));
  };
  return (
    <div className="join_request bg-slate-700">
      <div className="join_request_wrapper">
        {studentList !== undefined ? <span>join request here</span> : ""}
      </div>
      {studentList !== undefined ? (
        <table className="table mt-8 bg-slate-200    border-collapse border-slate-500 w-full ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">Reg no</th>
              <th className="border text-center p-2">name</th>
              <th className="border text-center p-2">email</th>
              <th className="border text-center p-2">contact_no</th>
              <th className="border text-center p-2">
                <span>Approve</span>/ <span>Reject</span>
              </th>
            </tr>

            {studentList?.map((x) => (
              <tr className="studentlist_tr text-black">
                <td className="border  cursor-pointer text-center p-2">
                  {x?.reg_no}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.name}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.email}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.contact_no}
                </td>
                <td className="border  cursor-pointer text-center flex  gap-2 p-2">
                  <span
                    onClick={() => handleApproval(x?.reg_no)}
                    className="bg-green-700 hover:bg-green-500 p-2 rounded-lg text-white text-xl"
                  >
                    Approve
                  </span>

                  <span className="bg-blue-700 hover:bg-blue-500 p-2 rounded-lg text-white text-xl">
                    Reject
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No request found</p>
      )}
    </div>
  );
};

export default JoinRequest;
