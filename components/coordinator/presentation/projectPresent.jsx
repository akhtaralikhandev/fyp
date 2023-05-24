import { useSelector } from "react-redux";
import React, { useContext, useState } from "react";
import Sidebar from "./presentSidebar";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createPresentation } from "../../../redux/features/coordinator/coordinator_slice";
import Navbar from "../navbar";
import { useEffect } from "react";
import { fetchAllPresentations } from "../../../redux/features/coordinator/coordPresentationSlice";
import { NavbarContext } from "../navbarContext";
const PresentationList = ({ allPresentations }) => {
  const dispatch = useDispatch();
  const [venue, setVenue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const router = useRouter();
  const {
    editPresentationId,
    setEditPresentationId,
    setViewMorePresentationLoading,
    viewMorePresentationId,
    setViewMorePresentationId,
  } = useContext(NavbarContext);
  const [list, setList] = useState(allPresentations);
  const allProjects = useSelector(
    (state) => state.coordinator.projects.projects
  );

  const handleSortByTime = () => {
    const sortedList = [...list].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    console.log(sortedList);
    setList(sortedList);
  };
  const handleSortByProject = () => {
    const sortedList = [...list].sort((a, b) => {
      return a.projectId - b.projectId;
    });
    console.log("sorted list by projects");
    console.log(sortedList);
    setList(sortedList);
  };
  const handleButtonClick = () => {
    setIsActive(!isActive);
  };
  console.log("these are all presentations");
  console.log(allPresentations);
  console.log("these are all the projects ");
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
  useEffect(() => {
    dispatch(fetchAllPresentations());
  }, []);
  console.log("all projects ");
  console.log(allProjects);
  return (
    <div className="presentationLists">
      <Navbar />
      <div className="allPresentationsLeft">
        <Sidebar />
      </div>
      <div className="allPresentationsRight ml-14 mr-4">
        {list.length > 0 ? (
          <div className="allPresentations p-4">
            <div className="flex  p-4">
              <span className="text-3xl text-blue-900">
                Projects Lists Click View More to see presentation list
              </span>
              <div
                className={`dropdown ${
                  isActive ? "active" : ""
                } absolute top-40 right-20`}
              >
                <button className="dropbtn" onClick={handleButtonClick}>
                  Sort By
                </button>
                <ul className="dropdown-content p-3 shadow-xl rounded-lg">
                  <li
                    className=" cursor-pointer hover:underline"
                    onClick={() => handleSortByTime()}
                  >
                    Sort By Time
                  </li>
                  <li className=" cursor-pointer hover:underline">
                    Sort By Status
                  </li>
                  <li
                    className=" cursor-pointer hover:underline"
                    onClick={() => handleSortByProject()}
                  >
                    Sort By Project
                  </li>
                  <li className=" cursor-pointer hover:underline">
                    Sort By Panel
                  </li>
                </ul>
              </div>
            </div>

            <table className="table presentationListTable  w-full   border-collapse border-slate-500  ">
              <tbody>
                <tr className="  border-blue-500 text-xl">
                  <th className="border text-center p-2">Title</th>
                  <th className="border text-center p-2">No of Students</th>
                  <th className="border text-center p-2">Group leader</th>
                  <th className="border text-center p-2">Panel Number</th>
                  <th className="border text-center p-2">Status</th>
                  <th className="border text-center p-2">actions</th>
                </tr>
                {list?.map((x) => (
                  <tr className="studentlist_tr text-black">
                    <td className="border  cursor-pointer text-center p-2">
                      {x?.title}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      {x?.students?.length}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      {x?.admin_student_email}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      {x?.Panel?.id}
                    </td>
                    <td className="border  cursor-pointer text-center p-2">
                      {x?.status}
                    </td>
                    <td className="border flex  gap-4 items-center justify-center  cursor-pointer text-center p-2">
                      <span
                        onClick={() => {
                          setViewMorePresentationId(x?.id);
                          setViewMorePresentationLoading(true);
                          router.push("/coordinator/presentations/viewMore");
                        }}
                        class="tooltip"
                      >
                        <i class="fa fa-eye" aria-hidden="true"></i>
                        <span class="tooltiptext">viewmore</span>
                      </span>
                      <span class="tooltip">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        <span class="tooltiptext">Delete</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            {" "}
            <span>No presentation was found</span>{" "}
          </div>
        )}
      </div>
    </div>
  );
};
export default PresentationList;
