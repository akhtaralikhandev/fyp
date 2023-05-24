import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  clearPanelCreationError,
  createPanels,
  fetchPanels,
} from "../../../../redux/features/panel/panelSlice";
import MultiSelect from "./multiSelect";

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
const CreatePanel = () => {
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [employee, setEmployee] = useState("");
  const [project, setProject] = useState("");
  const projects = useSelector((state) => state.coordinator.projects.projects);
  const coordinator = useSelector((state) => state.coordinator.projects);
  const PanelCreationError = useSelector(
    (state) => state.panel.panelCreatedError
  );
  console.log(PanelCreationError);
  const dispatch = useDispatch();
  console.log(coordinator);
  console.log(projects);
  const projectsWithNullPanelNumber = projects?.filter(
    (project) => project.panelNumber === null
  );
  console.log("these are the projects with null panel number");
  console.log(projectsWithNullPanelNumber);
  const allEmployees = useSelector(
    (state) => state.coordinator.projects.employee
  );
  console.log("all employees");
  console.log(allEmployees);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee && project) {
      const data = {
        emails: employee,
        projects: project,
      };
      dispatch(createPanels(data));
    } else {
      alert("plz select at least one employee and project");
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
  useEffect(() => {
    console.log("I am called");
    const timer = setTimeout(() => {
      console.log("I am called after 3 seconds");
      dispatch(clearPanelCreationError());
    }, 10000);
    return () => clearTimeout(timer);
  }, [PanelCreationError, dispatch]);

  return (
    <div className="createPanel  w-full">
      <div className="createPanelWrapper mt-24">
        {PanelCreationError && (
          <div>
            <span className="text-red-500 ">
              these employees are already part of panels
            </span>
            {PanelCreationError?.assignedEmails?.map((x) => (
              <div>
                <span>{x}</span>
              </div>
            ))}
          </div>
        )}{" "}
        <div className="left_side_panel w-full gap-8 flex flex-col items-center justify-center">
          <span className="text-4xl italic ">create panel </span>
          <div className="flex gap-8 flex-col items-center w-full justify-center">
            <div className="flex gap-8 w-full flex-col items-center justify-center p-4">
              <MultiSelect
                options={allEmployees}
                value={employee}
                onChange={(selected) => setEmployee(selected)}
                project={false}
              />
              <MultiSelect
                options={projects}
                value={project}
                onChange={(selected) => setProject(selected)}
                project={true}
              />
            </div>
            <button
              className="bg-blue-700 mr-2 w-1/5 hover:bg-blue-500 text-white p-2 rounded-lg"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePanel;
