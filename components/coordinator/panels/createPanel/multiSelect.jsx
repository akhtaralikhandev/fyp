import { useState, useEffect } from "react";

function MultiSelect({ options, value, onChange, project }) {
  const [selected, setSelected] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (project) {
      // Find the advisor of the selected project
      const advisor = options?.find((option) => option.id === project.advisor);
      if (advisor) {
        // Add the advisor to the selected values
        setSelected([...selected, advisor.id]);
        onChange([...selected, advisor.id]);
      }
    }
  }, [project]);

  function handleOptionChange(optionName) {
    const selectedIndex = selected.indexOf(optionName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, optionName];
    } else if (selectedIndex === 0) {
      newSelected = [...selected.slice(1)];
    } else if (selectedIndex === selected.length - 1) {
      newSelected = [...selected.slice(0, -1)];
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }
    setSelected(newSelected);
    onChange(newSelected);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="dropdown" style={{ display: "inline-block" }}>
      <button
        className="btn btn-secondary   p-2 rounded-lg dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
        style={{ width: "100%" }}
      >
        {project ? (
          <span> Select Projects</span>
        ) : (
          <span>Select Employees</span>
        )}
      </button>

      <ul
        className="dropdown-menu  rounded-lg border border-gray-300"
        style={{ display: "block" }}
      >
        {options?.map((option) => {
          if (option.title) {
            return (
              <li
                key={option.name}
                className="dropdown-item m-2  flex p-1 text-xl rounded-lg"
              >
                <label className="checkbox flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg"
                    value={option.id}
                    checked={selected.includes(option.id)}
                    onChange={() => handleOptionChange(option.id)}
                  />
                  {option.id}{" "}
                  <div className="flex gap-8">
                    <span>
                      {option.title}
                      {option.panelNumber ? (
                        <span>Panel Number : {option?.panelNumber}</span>
                      ) : (
                        ""
                      )}
                    </span>
                    <span>Admin Student : {option?.admin_student_email}</span>
                  </div>
                </label>
              </li>
            );
          } else {
            return (
              <li
                key={option.name}
                className="dropdown-item m-2 flex gap-8 p-1 text-xl rounded-lg"
              >
                <label className="checkbox flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg"
                    value={option.email}
                    checked={selected.includes(option.email)}
                    onChange={() => handleOptionChange(option.email)}
                    disabled={option.panelNumber ? true : false}
                  />
                  <span className="flex gap-8">
                    {option.name}
                    {option.panelNumber ? (
                      <span>Panel Number : {option?.panelNumber}</span>
                    ) : (
                      <span> Available</span>
                    )}
                  </span>
                </label>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default MultiSelect;
