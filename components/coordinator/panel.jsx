import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  createPresentation,
  fetchEmployees,
} from "../../redux/features/presentations/presentationSlice";
import MultiSelect from "./MultiSelect";
import {
  createPanels,
  fetchPanels,
} from "../../redux/features/panel/panelSlice";

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
      <div className="panel_wrapper flex  justify-between p-8">
        <div className="left_side_panel  gap-8 flex flex-col items-center justify-center">
          <span className="text-4xl italic ">create panel </span>
          <div className="flex gap-8">
            <div>
              <MultiSelect
                options={allEmployees}
                value={employee}
                onChange={(selected) => setEmployee(selected)}
                project={false}
              />
            </div>
            <div>
              <MultiSelect
                options={projects}
                value={project}
                onChange={(selected) => setProject(selected)}
                project={true}
              />
            </div>
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </div>
        </div>
        <div className="right_side_panel">
          <ul className="flex gap-4">
            <li>Panel Id </li>
            <li onClick={() => setShow(!show)}>Show All Emplyees</li>
            <li onClick={() => setShow2(!show2)}>Show All Projects</li>
          </ul>
          {allPanels.map((x) => (
            <div>
              <span>Id : {x.id} </span>{" "}
              <div>
                {show
                  ? x.Employees?.map((y) => (
                      <ul className="flex flex-col">
                        <li> Email : {y.email} </li>
                        <li> Name : {y.name} </li>
                        <li>Contact_no : {y.contact_no} </li>
                      </ul>
                    ))
                  : ""}
              </div>
              <div>
                {show2
                  ? x.projects.map((y) => (
                      <ul>
                        <li>Project Title : {y.title}</li>
                        <li>Admin Student : {y.admin_student_email}</li>
                        <li>
                          {y.presentation_SceduleId !== null ? (
                            <span>
                              {" "}
                              Presentation Scedule : {y.presentation_SceduleId}
                            </span>
                          ) : (
                            <div>
                              <span onClick={() => setAdd(!add)}>
                                Add Presentation
                              </span>
                              {add ? (
                                <div className="flex flex-col">
                                  <input
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    type="datetime-local"
                                  />
                                  <input
                                    type="text"
                                    placeholder="write venue here"
                                    className="text-black  border 1px outline-blue-600 border-blue-600"
                                    value={venue}
                                    onChange={(e) => setVenue(e.target.value)}
                                  />
                                  <button
                                    onClick={(e) =>
                                      handleSubmitPresentation(e, y.id)
                                    }
                                  >
                                    submit
                                  </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </li>
                        <li>
                          {x.employee?.map((x) => (
                            <ul>
                              <li>{x.employee_email}</li>
                            </ul>
                          ))}
                        </li>
                      </ul>
                    ))
                  : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Panel;
