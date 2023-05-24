import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  fetchJoinRequests,
  studentProjectApproval,
  fetchRequests,
} from "../../redux/features/student/studentSlice";
import { handleAddingStudent2 } from "../../redux/features/coordinator/coordinator_slice";
import axios from "axios";
import { RequestStatus } from "@prisma/client";
const JoinRequest = ({ data }) => {
  const { data: session } = useSession();
  const [status, setStatus] = useState("");
  const { projectId, reg_no } = session.user;
  const studentRequest2 = useSelector(
    (state) => state.student?.projects?.student_request
  );
  const studentRequest = studentRequest2?.filter(
    (x) => x.status !== "ACCEPTED"
  );

  console.log("this is student Requests");
  console.log(studentRequest);
  const id = useSelector((state) => state.student?.joinRequest[0]?.id);
  console.log("project id from join requests ");
  console.log(projectId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJoinRequests(projectId));
  }, []);
  const handleApproval = (student_reg_no) => {
    const data = {
      id: id,
      reg_no: student_reg_no,
      projectId: projectId,
      status: RequestStatus.ACCEPTED,
    };
    console.log("project is apprvaed");
    console.log(data);
    dispatch(studentProjectApproval(data));
  };

  return (
    <div className="join_request bg-slate-700">
      <div className="join_request_wrapper">
        {studentRequest?.length > 0 ? <span>join request here</span> : ""}
      </div>
      {studentRequest?.length > 0 ? (
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

            {studentRequest?.map((x) => (
              <tr key={x?.student_reg_no} className="studentlist_tr text-black">
                <td className="border  cursor-pointer text-center p-2">
                  {x?.student?.student_reg_no}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.student?.name}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.student?.email}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x?.student?.contact_no}
                </td>
                <td className="border  cursor-pointer text-center flex  gap-2 p-2">
                  <span
                    onClick={() => {
                      setStatus(RequestStatus.ACCEPTED);
                      handleApproval(x?.student_reg_no);
                    }}
                    className="bg-green-700 hover:bg-green-500 p-2 rounded-lg text-white text-xl"
                  >
                    Approve
                  </span>

                  <span
                    onClick={() => {
                      setStatus(RequestStatus.REJECTED);
                      handleApproval(x?.student_reg_no);
                    }}
                    className="bg-blue-700 hover:bg-blue-500 p-2 rounded-lg text-white text-xl"
                  >
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
