import { useSelector } from "react-redux";
import React, { useState } from "react";
import { createPresentation } from "../../../redux/features/presentations/presentationSlice";
import { useDispatch } from "react-redux";
const PresentationList = () => {
  const dispatch = useDispatch();
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const allProjects = useSelector(
    (state) => state.coordinator.projects.projects
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleCreatePresentation = (e) => {
    e.preventDefault();
    if (venue && date && projectId) {
      const data = {
        venue: venue,
        date: date,
        projectId: projectId,
      };
      dispatch(createPresentation(data));
      console.log("clicked data create presentation");
      console.log(data);
    }
  };
  console.log("all projects ");
  console.log(allProjects);
  return (
    <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
      <tbody>
        <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
          <th className="border text-center p-2">Project Id</th>
          <th className="border text-center p-2">Title</th>
          <th className="border text-center p-2">Admin Student</th>
          <th className="border text-center p-2">Presentation Date and Time</th>
          <th className="border text-center p-2"> Presentation Venue</th>
        </tr>
        {allProjects?.map((x) => (
          <tr className="studentlist_tr text-black">
            <td className="border  cursor-pointer text-center p-2">{x.id}</td>
            <td className="border  cursor-pointer text-center p-2">
              {x.title}
            </td>
            <td className="border  cursor-pointer text-center p-2">
              {x.admin_student_email}
            </td>
            {x.Presentation_Scedule?.date ? (
              <>
                <td className="border  cursor-pointer text-center p-2">
                  {x.Presentation_Scedule?.date}
                </td>
                <td className="border  cursor-pointer text-center p-2">
                  {x.Presentation_Scedule?.venue}
                </td>{" "}
              </>
            ) : (
              <td
                className="border bg-green-700 text-white hover:bg-green-500  cursor-pointer text-center p-2"
                onClick={() => {
                  setProjectId(x.id);
                  setIsFormVisible(true);
                }}
              >
                Add Presentation
              </td>
            )}
          </tr>
        ))}
      </tbody>
      {isFormVisible && (
        <div className="bg-white absolute top-1/2 left-1/2 transform w-96 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg">
          <form className="flex flex-col gap-4 relative">
            <div className="flex items-center justify-between xl:text-xl">
              <label htmlFor="presentation-date">Presentation Date:</label>
              <span
                onClick={() => setIsFormVisible(false)}
                className="text-2xl text-red-600 cursor-pointer"
              >
                <i class="fa fa-close" aria-hidden="true"></i>
              </span>
            </div>

            <input
              type="text"
              placeholder="write venue here"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              id="presentation-date"
              className="border p-2 rounded-lg outline-blue-700"
            />
            <label htmlFor="">select date and time</label>
            <input
              type="datetime-local"
              className="border p-2 rounded-lg outline-blue-700"
              onChange={(e) => setDate(e.target.value)}
            />
            <button
              onClick={(e) => {
                console.log("clicked");
                handleCreatePresentation(e);
                console.log(date);
                console.log(projectId);
              }}
              className="bg-green-700 text-white p-2 rounded-lg hover:bg-green-500 cursor-pointer"
            >
              submit
            </button>
          </form>
        </div>
      )}
    </table>
  );
};
export default PresentationList;
