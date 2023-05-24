import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee } from "../../../redux/features/employee/employeeSlice";
const Panel = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const panel2 = useSelector((state) => state.employee.employee?.Panel);
  useEffect(() => {
    dispatch(fetchEmployee(email));
  }, []);
  console.log("Panel2");
  console.log(panel2);
  return (
    <div className="viewPanel">
      {" "}
      {panel2 !== null ? (
        <div className="viewPanel_wrapper">
          <div className="flex flex-col relative">
            <div>
              <span>Panel Number : {panel2?.id}</span>
            </div>
            <div className="flex items-center justify-center">
              Employee Detail
            </div>
          </div>
          <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
            <tbody>
              <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                <th className="border text-center p-2">Email</th>
                <th className="border text-center p-2">name</th>
                <th className="border text-center p-2">contact no</th>
              </tr>
              {panel2?.Employees.map((x) => (
                <tr className="studentlist_tr text-black">
                  <td className="border  cursor-pointer text-center p-2">
                    {x?.email}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {x?.name}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {x?.contact_no}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
          <div className=" flex items-center justify-center">
            {" "}
            <span>Project Details</span>
          </div>
          <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
            <tbody>
              <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                <th className="border text-center p-2">Project Id</th>
                <th className="border text-center p-2">Title</th>
                <th className="border text-center p-2">Admin Student</th>
                <th className="border text-center p-2">
                  Presentation Date and Time
                </th>
                <th className="border text-center p-2"> Presentation Venue</th>
              </tr>
              {panel2?.projects.map((x) => (
                <tr className="studentlist_tr text-black">
                  <td className="border  cursor-pointer text-center p-2">
                    {x.id}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {x.title}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {x.admin_student_email}
                  </td>
                  {x.Presentation_Scedule.date ? (
                    <>
                      <td className="border  cursor-pointer text-center p-2">
                        {x.Presentation_Scedule.date}
                      </td>
                      <td className="border  cursor-pointer text-center p-2">
                        {x.Presentation_Scedule.venue}
                      </td>{" "}
                    </>
                  ) : (
                    <span>Add Presentation </span>
                  )}
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </div>
      ) : (
        <div>
          <span>Not Part of any panel</span>
        </div>
      )}
    </div>
  );
};
export default Panel;
