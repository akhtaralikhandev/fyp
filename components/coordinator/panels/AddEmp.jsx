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
    <div className="flex flex-col mt-4 gap-4 w-1/3  items-center justify-start">
      <select
        value={addEmpEmail}
        className="p-2"
        onChange={handleEmployeeSelect}
      >
        <option value="">Select an employee</option>
        {employees.map((employee) => (
          <option className="p-2" key={employee.id} value={employee.email}>
            {employee.name}
          </option>
        ))}
      </select>

      <button
        className="flex-start bg-blue-700 rounded-lg hover:bg-blue-500 cursor-pointer p-2 text-white "
        onClick={() => handleAdd(id)}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EmployeeList;
