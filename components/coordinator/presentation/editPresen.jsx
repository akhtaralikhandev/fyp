import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Sidebar from "./presentSidebar";
import Navbar from "../navbar";
import { NavbarContext } from "../navbarContext";
import SearchableDropdownList from "./dropdown";
import SearchableDropdownListVenue from "./dropVenues";
import {
  clearUpdatePresentationSuccess,
  updatePresentation,
} from "../../../redux/features/coordinator/coordPresentationSlice";
import { useEffect } from "react";
const EditPresentationComp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [numberOfRubrics, setNumberOfRubrics] = useState();
  const {
    editPresentationId,
    setEditPresentationId,
    setViewMorePresentationLoading,
    viewMorePresentationLoading,
    viewMorePresentationId,
    setViewMorePresentationId,
  } = useContext(NavbarContext);
  const allPresentations = useSelector(
    (state) => state.coordPresentation.allPresentations
  );
  const thisPresentation = allPresentations.filter(
    (x) => x.id === editPresentationId
  )[0];
  console.log("this is the presntation ");
  console.log(thisPresentation);
  const [title, setTitle] = useState(thisPresentation?.title);
  const [date, setDate] = useState(new Date(thisPresentation?.date));
  console.log("this is the date");
  console.log(date);
  const updatePresentationSuccess = useSelector(
    (state) => state.coordPresentation.updatePresentationSuccess
  );
  useEffect(() => {
    setPresentationVenue(thisPresentation?.venue);
  }, []);
  console.log("date");
  console.log(date);
  const [Presentation_number, setPresentation_number] = useState(
    thisPresentation?.Presentation_number
  );
  const { presentationVenue, setPresentationVenue } = useContext(NavbarContext);
  const [addRubrics, setAddRubrics] = useState(false);
  const [rubrics, setRubrics] = useState([]);

  console.log(editPresentationId);
  const handleNumberOfRubricsChange = (event) => {
    setNumberOfRubrics(event.target.value);
  };
  const handleRubricChange = (index, value) => {
    const newRubrics = [...rubrics];
    newRubrics[index] = value;
    setRubrics(newRubrics);
    console.log(rubrics);
  };
  const renderRubricInputs = () => {
    if (numberOfRubrics) {
      return Array.from({ length: numberOfRubrics }, (_, index) => (
        <div key={index}>
          <textarea
            className="border-2 w-full p-2 rounded-lg outline-blue-800 border-blue-500"
            type="text"
            placeholder={`Rubric ${index + 1}`}
            id={`rubric-${index}`}
            name=""
            value={rubrics[index] || ""}
            onChange={(e) => handleRubricChange(index, e.target.value)}
            cols="30"
            rows="3"
          ></textarea>
        </div>
      ));
    }
  };
  const handleUpdatePresentation = () => {
    const data = {
      id: editPresentationId,
      rubrics: rubrics,
      date: date,
      title: title,
      venue: presentationVenue,
    };
    console.log("clicked");
    dispatch(updatePresentation(data));
  };

  useEffect(() => {
    if (updatePresentationSuccess) {
      const timeoutId = setTimeout(() => {
        dispatch(clearUpdatePresentationSuccess(""));
        setViewMorePresentationId(editPresentationId);
        setViewMorePresentationLoading(true);
        router.push("/coordinator/presentations/viewMore");
      }, 2000);

      // Clean up the timeout when the component unmounts or updatePresentationSuccess changes
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, updatePresentationSuccess]);

  return (
    <div className="presentationLists">
      <Navbar />
      <div className="allPresentationsLeft">
        <Sidebar />
      </div>
      <div className="allPresentationsRight mt-24 ml-24 mr-8">
        <div className="createPresentation">
          {updatePresentationSuccess ? (
            <span>{updatePresentationSuccess}</span>
          ) : (
            <div className="createPresentationWrapper flex gap-8 flex-col">
              <span className="text-3xl text-blue-900 font-bold">
                Edit Presentation here{" "}
              </span>
              <div className="flex flex-col">
                <label htmlFor="">Presentation Title</label>
                <textarea
                  className="border-2 rounded-lg  resize-none outline-blue-800 p-2 border-blue-500"
                  name=""
                  id=""
                  cols="80"
                  rows="4"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Write Presentation title here"
                ></textarea>
              </div>
              {/* <div>
              <div>
                <span>Current Project</span>
                <span>{venue}</span>
              </div>
              <label htmlFor="">Change Project here</label>
              <SearchableDropdownList projects={allProjects} />
            </div> */}
              <div className="flex flex-col">
                <div className="flex gap-8">
                  <span>Current Venue</span>
                  <span>{presentationVenue}</span>
                </div>
                <label htmlFor="">Change Venue</label>
                <SearchableDropdownListVenue />
              </div>
              <div className="flex flex-col">
                <div className="flex  gap-8">
                  <label htmlFor="">Current date and time</label>
                  <span>{date.toLocaleString()}</span>
                </div>

                <span>change here</span>
                <input
                  className="border-2 border-blue-500 p-2 rounded-lg"
                  type="datetime-local"
                  name=""
                  value={date}
                  id=""
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: "100%" }} // add a width style to the input element
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Presentation Number</label>
                <input
                  placeholder="write presentation number"
                  type="number"
                  value={Presentation_number}
                  onChange={(e) => setPresentation_number(e.target.value)}
                  className="border-2 p-2  rounded-lg outline-blue-800 border-blue-500"
                />
              </div>

              <div className="flex gap-2 justify-between">
                <button
                  onClick={() => handleUpdatePresentation()}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg cursor-pointer"
                >
                  Submit
                </button>
                <button
                  className={
                    addRubrics
                      ? "bg-red-700 hover:bg-red-600 text-white rounded-lg cursor-pointer p-2"
                      : "bg-blue-700 hover:bg-blue-600 text-white rounded-lg cursor-pointer p-2"
                  }
                  onClick={() => setAddRubrics(!addRubrics)}
                >
                  {addRubrics ? "Cancel" : "Add/Edit Rubrics"}
                </button>
              </div>

              {addRubrics ? (
                <input
                  placeholder="write number of rubrics"
                  type="text"
                  value={numberOfRubrics}
                  onChange={handleNumberOfRubricsChange}
                  className="border-2 p-2 rounded-lg outline-blue-800 border-blue-500"
                />
              ) : (
                ""
              )}

              {addRubrics && numberOfRubrics && renderRubricInputs()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditPresentationComp;
