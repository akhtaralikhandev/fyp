import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePanel } from "../../../redux/features/panel/panelSlice";
import { NavbarContext } from "../navbarContext";
const EmployeeList = ({ employees, id }) => {
  const { setAddEmpEmail, addEmpEmail } = useContext(NavbarContext);
  const dispatch = useDispatch();
  const handleAdd = (id) => {
    if (id && addEmpEmail) {
      const data = {
        id: id,
        email: addEmpEmail,
      };
      dispatch(updatePanel(data));
    }
  };

  const handleEmployeeSelect = (e) => {
    const selectedEmail = e.target.value;
    setAddEmpEmail(selectedEmail);
    console.log(selectedEmail);
  };

  return (
    <div className="flex flex-col mt-4 gap-2 w-1/3  items-start justify-start">
      <select value={addEmpEmail} onChange={handleEmployeeSelect}>
        <option value="">Select an employee</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.email}>
            {employee.name}
          </option>
        ))}
      </select>

      <button className="flex-start" onClick={() => handleAdd(id)}>
        Save Changes
      </button>
    </div>
  );
};

export default EmployeeList;
