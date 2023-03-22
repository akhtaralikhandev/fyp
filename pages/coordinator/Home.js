import { NavbarContext } from "../../components/coordinator/navbarContext";
import Home from "../../components/coordinator/Home";
import { useState } from "react";
const Coordinator_home = () => {
  const [render, setRender] = useState("All Projects");
  const [id, setId] = useState("");
  const [viewMore, setViewMore] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [createPanel, setCreatePanel] = useState(false);
  const [addEmpEmail, setAddEmpEmail] = useState("");
  const [addProjectId, setAddProjectId] = useState("");
  const [projectId, setProjectId] = useState("");
  return (
    <NavbarContext.Provider
      value={{
        addEmpEmail,
        setAddEmpEmail,
        render,
        setRender,
        id,
        setId,
        viewMore,
        setViewMore,
        addEmployee,
        setAddEmployee,
        addEmployee,
        setAddProject,
        addProject,
        createPanel,
        setCreatePanel,
        addProjectId,
        setAddProjectId,
        projectId,
        setProjectId,
      }}
    >
      <div>
        <Home />
      </div>{" "}
    </NavbarContext.Provider>
  );
};
export default Coordinator_home;
