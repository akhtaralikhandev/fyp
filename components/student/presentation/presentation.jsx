import { useSelector } from "react-redux";
const Presentation = () => {
  const presentation = useSelector(
    (state) => state.student.student?.project?.Presentation_Scedule
  );
  const panelEmployees = useSelector(
    (state) => state.student.student?.project?.Panel?.Employees
  );
  console.log(presentation);
  return (
    <div className="student_presentation">
      <div className="student_presentation_wrapper">
        {" "}
        <div className="flex flex-col items-center">
          <div>
            <div className="flex flex-col gap-8  xl:p-12 ">
              <div className="flex gap-24 items-center">
                <span className="xl:text-4xl flex-1 text-blue-200 font-bold">
                  Date :{" "}
                </span>
                <span className="text-xl flex   items-start flex-1">
                  {presentation?.date}
                </span>
              </div>

              <div className="flex gap-24 items-center">
                <span className="text-blue-200 flex-1 text-2xl">Venue</span>
                <span className="flex-1 items-start flex justify-start">
                  {presentation?.venue}
                </span>
              </div>
              <div className="flex gap-24 items-center">
                <span className="text-blue-200 text-2xl flex-1">status</span>
                <span className="flex-1 items-start flex">
                  {presentation?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <span>Project Faculty</span>
        <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
          <tbody>
            <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
              <th className="border text-center p-2">Email</th>
              <th className="border text-center p-2">name</th>
              <th className="border text-center p-2">contact no</th>
            </tr>
            {panelEmployees?.map((x) => (
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
        </table>
      </div>
    </div>
  );
};
export default Presentation;
