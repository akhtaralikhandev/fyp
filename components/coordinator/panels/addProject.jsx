import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePanel } from "../../../redux/features/panel/panelSlice";
import { NavbarContext } from "../navbarContext";
const AddProject = ({ projects, id }) => {
  const { addProjectId, setAddProjectId } = useContext(NavbarContext);
  const dispatch = useDispatch();
  const handleAdd = (id) => {
    if (id && addProjectId) {
      const data = {
        id: id,
        projectId: addProjectId,
      };
      dispatch(updatePanel(data));
      console.log("clicked");
    }
  };
  const handleEmployeeSelect = (e) => {
    const selectedProject = e.target.value;
    setAddProjectId(selectedProject);
  };
  return (
    <div className="flex flex-col gap-2 w-1/3 mt-4  items-start justify-start">
      <select value={addProjectId} onChange={handleEmployeeSelect}>
        <option value="">Select Project</option>
        {projects.map((x) => (
          <option key={x.id} value={x.id}>
            {x.title}
          </option>
        ))}
      </select>

      <button className="flex-start" onClick={() => handleAdd(id)}>
        Save Changes
      </button>
    </div>
  );
};

export default AddProject;
