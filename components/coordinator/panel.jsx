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

import CreatePanel from "./panels/createPanel/create";
import Sidebar from "./sidebar/panelSidebar";
import FacultyPage from "./panels/faculty/faculty";
import AllProjects from "./panels/projects/allProjects";
import { setPanelRender } from "../../redux/features/coordinator/coordinator_slice";

const Panel = () => {
  const { data: session } = useSession();
  const [date, setDate] = useState("");
  const [add, setAdd] = useState(false);
  const [venue, setVenue] = useState("");
  const [employee, setEmployee] = useState("");
  const [project, setProject] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const projects = useSelector((state) => state.coordinator.projects.projects);
  console.log(projects);
  const projectsWithNullPanelNumber = projects?.filter(
    (project) => project.panelNumber === null
  );
  const panelRender = useSelector((state) => state.coordinator.panelRender);
  console.log("this is panel render");
  console.log(panelRender);
  console.log(projectsWithNullPanelNumber);
  const allEmployees = useSelector((state) => state.presentation.employees);
  const allPanels = useSelector((state) => state.panel.panel);
  console.log("all panels are here");
  console.log(allPanels);
  console.log(allEmployees);
  const { coordinator_depart } = session.user;
  const dispatch = useDispatch();
  console.log(allEmployees);
  useEffect(() => {
    dispatch(fetchEmployees(coordinator_depart));
  }, []);
  useEffect(() => {
    dispatch(fetchPanels(coordinator_depart));
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
  useEffect(() => {
    dispatch(setPanelRender("All Panels"));
  }, []);
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
  if (panelRender === "create Panel") {
    return (
      <div className="panel">
        <div className="leftsidePanel">
          <Sidebar />
        </div>
        <div className="rightSidePanel">
          <CreatePanel />;
        </div>
      </div>
    );
  } else if (panelRender === "Facult") {
    return (
      <div className="panel">
        <div className="leftsidePanel">
          <Sidebar />
          <span>this is faculty page</span>
        </div>
        <div className="rightSidePanel">
          <span>last page oohhhh</span>
          <span>this is the faculty page </span>
        </div>
      </div>
    );
  } else if (panelRender === "All Panels") {
    return (
      <div className="panel flex">
        <div className="leftsidePanel">
          <Sidebar />
        </div>
        <div className="rightSidePanel">
          <PanelList />;
        </div>
      </div>
    );
  } else if (panelRender === "allProjects") {
    return (
      <div className="panel flex">
        <div className="leftsidePanel">
          <Sidebar />
          <span>This is the all project list</span>
        </div>
        <div className="rightSidePanel">
          <AllProjects />;<span>all projects</span>
        </div>
      </div>
    );
  }
};
export default Panel;
