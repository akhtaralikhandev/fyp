import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPresentations } from "../../../redux/features/employee/employeeSlice";

const Presentation = () => {
  const panel2 = useSelector((state) => state.employee.employee?.Panel?.id);
  const presentations = useSelector((state) => state?.employee?.presentations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPresentations(panel2));
  }, []);
  return (
    <div className="presentation">
      <div className="presentation_wrapper">
        {presentations.length > 0 ? (
          <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
            <tbody>
              <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                <th className="border text-center p-2">Presentation Number</th>
                <th className="border text-center p-2">Date</th>
                <th className="border text-center p-2">Venue</th>
                <th className="border text-center p-2">status</th>
              </tr>
              {presentations?.map((x) => (
                <tr className="studentlist_tr text-black">
                  <td className="border  cursor-pointer text-center p-2">
                    {x?.Presentation_Scedule?.Presentation_number}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {x?.Presentation_Scedule?.date}
                  </td>
                  <td className="border  cursor-pointer text-center p-2">
                    {x?.Presentation_Scedule?.venue}
                  </td>

                  <td className="border  cursor-pointer text-center p-2">
                    {x?.Presentation_Scedule?.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Presentation;
