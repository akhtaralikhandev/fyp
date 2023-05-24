import { useState, useEffect, useContext } from "react";
import Navbar from "../navbar";
import Sidebar from "./presentSidebar";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  fetchAllProjectsCreatePresentation,
  clearPresentationCreationError,
  clearPresentationCreationSuccess,
  createPresentation,
  fetchAllPresentations,
} from "../../../redux/features/coordinator/coordPresentationSlice";

// import { createPresentation } from "../../../redux/features/coordinator/coordinator_slice";
import { useSelector, useDispatch } from "react-redux";
import SearchableDropdownList from "./dropdown";
import SearchableDropdownListVenue from "./dropVenues";
import { NavbarContext } from "../navbarContext";
const CreatePresentationComp = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { list, setList } = useContext(NavbarContext);
  const [title, setTitle] = useState("");
  const [rubrics, setRubrics] = useState([]);
  const [statement, setStatement] = useState("");
  const [addRubrics, setAddRubrics] = useState(false);
  const [numberOfRubrics, setNumberOfRubrics] = useState();
  const [Presentation_number, setPresentation_number] = useState("");
  const [date, setDate] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null);
  const createPresentationLoading = useSelector(
    (state) => state.coordPresentation.createPresentationLoading
  );
  console.log("create presentation loading");
  console.log(createPresentationLoading);
  const state = useSelector((state) => console.log(state));
  const createPresentationError = useSelector(
    (state) => state.coordPresentation.presentCreationError
  );

  const createPresentationSuccessMessage = useSelector(
    (state) => state.coordPresentation.presentCreationSuccessMessage
  );

  const newCreatedPresentationId = useSelector(
    (state) => state.coordPresentation.newlyCreatedPresentationId
  );
  console.log("new created Presentation id");
  console.log(newCreatedPresentationId);
  console.log("this is the create presentation loading component errrr");
  const department_name = session?.user?.department_name;
  console.log(createPresentationError);
  const allProjects = useSelector(
    (state) => state.coordPresentation.allProjects
  );
  const allPresentations = useSelector(
    (state) => state.coordPresentation.allPresentations
  );
  //  presentationVenue,
  //       setPresentationVenue,
  //       presentationProjectId,
  //       setPresentationProjectId,
  const {
    presentationVenue,
    setPresentationVenue,
    presentationProjectId,
    setPresentationProjectId,
    setViewMorePresentationId,
    setViewMorePresentationLoading,
  } = useContext(NavbarContext);
  console.log(allProjects);
  const dispatch = useDispatch();
  const handleNumberOfRubricsChange = (event) => {
    setNumberOfRubrics(event.target.value);
  };
  useEffect(() => {
    dispatch(fetchAllProjectsCreatePresentation());
  }, []);
  const handleCreatePresentation = (e) => {
    e.preventDefault();
    if ((title && date && presentationVenue, presentationProjectId)) {
      const data = {
        title: title,
        date: date,
        projectId: presentationProjectId,
        venue: presentationVenue,
        Presentation_number: Presentation_number,
        rubrics: rubrics,
      };
      console.log(data);
      dispatch(createPresentation(data));
      dispatch(fetchAllPresentations(department_name));
      setList(allPresentations);
    }
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
  useEffect(() => {
    let timeoutId;

    if (createPresentationError) {
      timeoutId = setTimeout(() => {
        dispatch(clearPresentationCreationError());
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [createPresentationError, dispatch]);
  useEffect(() => {
    let timeoutId;

    if (createPresentationSuccessMessage) {
      timeoutId = setTimeout(() => {
        dispatch(clearPresentationCreationSuccess());
        setViewMorePresentationId(newCreatedPresentationId);
        setViewMorePresentationLoading(true);
        router.push("/coordinator/presentations/viewMore");
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [createPresentationSuccessMessage, dispatch]);
  return (
    <div className="text-black">
      <Navbar />
      <div className="div flex">
        <div className="createPresentationLeftSide fixed">
          <Sidebar />
        </div>
        <div className="rightside pl-72 mt-32 m-8">
          <div className="createPresentation">
            <div className="createPresentationWrapper flex gap-8 flex-col">
              {createPresentationError && (
                <span className="text-3xl text-red-500">
                  {createPresentationError.message}
                </span>
              )}
              {createPresentationSuccessMessage && (
                <span className="text-3xl text-blue-700">
                  {createPresentationSuccessMessage}
                </span>
              )}
              <span className="text-3xl text-blue-900 font-bold">
                Create Presentation here{" "}
              </span>
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
              <SearchableDropdownList projects={allProjects} />
              <SearchableDropdownListVenue />

              <input
                className="border-2 border-blue-500 p-2 rounded-lg"
                type="datetime-local"
                name=""
                value={date}
                id=""
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                placeholder="write presentation number"
                type="number"
                value={Presentation_number}
                onChange={(e) => setPresentation_number(e.target.value)}
                className="border-2 p-2  rounded-lg outline-blue-800 border-blue-500"
              />
              <div className="flex gap-2 justify-between">
                <button
                  onClick={(e) => {
                    console.log("clicked");
                    handleCreatePresentation(e);
                  }}
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
                  {addRubrics ? "Cancel" : "Add Rubrics"}
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePresentationComp;
