import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

import {
  createPresentation,
  fetchEmployees,
} from "../../redux/features/presentations/presentationSlice";
// import MultiSelect from "./MultiSelect";
import {
  createPanels,
  fetchPanels,
} from "../../redux/features/panel/panelSlice";
import PanelList from "./panels/panelList";
import { NavbarContext } from "./navbarContext";
import CreatePanel from "./panels/createPanel/create";

const Panel = () => {
  const { data: session } = useSession();
  const [date, setDate] = useState("");
  const [add, setAdd] = useState(false);
  const [venue, setVenue] = useState("");
  const [employee, setEmployee] = useState("");
  const [project, setProject] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const { viewMore, createPanel, setCreatePanel } = useContext(NavbarContext);
  const projects = useSelector((state) => state.coordinator.projects.projects);
  console.log(projects);
  const projectsWithNullPanelNumber = projects?.filter(
    (project) => project.panelNumber === null
  );
  console.log(projectsWithNullPanelNumber);
  const allEmployees = useSelector((state) => state.presentation.employees);
  const allPanels = useSelector((state) => state.panel.panel);
  console.log("all panels are here");
  console.log(allPanels);
  console.log(allEmployees);
  const { department_name } = session.user;
  const dispatch = useDispatch();
  console.log(allEmployees);
  useEffect(() => {
    dispatch(fetchEmployees(department_name));
  }, []);
  useEffect(() => {
    dispatch(fetchPanels(department_name));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee) {
      const data = {
        emails: employee,
        projects: project,
      };
      dispatch(createPanels(data));
    }
  };
  const handleSubmitPresentation = (e, projectId) => {
    if (date && venue && projectId) e.preventDefault();
    {
      const data = {
        date: date,
        venue: venue,
        projectId: projectId,
      };
      dispatch(createPresentation(data));
    }
  };
  return (
    <div className="panel">
      <div className="panel_wrapper flex  items-center  justify-center p-8">
        {viewMore ? (
          ""
        ) : (
          <span
            onClick={() => setCreatePanel(!createPanel)}
            className={
              createPanel
                ? "absolute right-10 top-32 bg-red-700 text-white p-2 rounded-lg hover:bg-red-500 cursor-pointer"
                : "absolute right-10 top-32 bg-green-700 text-white p-2 rounded-lg hover:bg-green-500 cursor-pointer"
            }
          >
            {createPanel ? <span>cancel</span> : <span>create</span>}
          </span>
        )}
        {createPanel ? <CreatePanel /> : <PanelList />}
      </div>
    </div>
  );
};
export default Panel;
