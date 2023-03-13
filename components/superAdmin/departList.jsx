import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  updateDepartments,
} from "../../redux/features/superAdmin/superAdminSlice";

const Depart_list = () => {
  const dispatch = useDispatch();
  const [departAddStates, setDepartAddStates] = useState({});
  const [coordinator_email, setCoordinator_email] = useState("");
  useEffect(() => {
    dispatch(fetchDepartments());
  }, []);
  const departements = useSelector((state) => state.superAdmin.departments);
  console.log(departements);
  const handleUpdate = (x) => {
    if (coordinator_email) {
      const value = {
        coordinator_email: coordinator_email,
        name: x.name,
      };
      try {
        dispatch(updateDepartments(value));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleAddClick = (departId) => {
    setDepartAddStates((prevState) => ({
      ...prevState,
      [departId]: !prevState[departId],
    }));
  };

  return (
    <div className="depart_list bg-slate-700 h-full">
      <div className="depart_list_wrapper flex items-center justify-center gap-4 flex-col">
        {departements.map((x) => (
          <ul className="flex  xl:w-1/2  justify-between text-2xl text-white">
            <li>{x.name}</li>
            <li>
              {x.coordinator_email ? (
                <span>{x.coordinator_email}</span>
              ) : (
                <div className="flex flex-col">
                  <span
                    className="cursor-pointer underline mb-2"
                    onClick={() => handleAddClick(x.id)}
                  >
                    Add Coordinator{" "}
                  </span>
                  {departAddStates[x.id] ? (
                    <div>
                      <input
                        className="p-2 outline-blue-500 rounded-lg text-black bg-white"
                        placeholder="add coordinator email"
                        value={coordinator_email}
                        onChange={(e) => setCoordinator_email(e.target.value)}
                      />
                      <button
                        onClick={() => handleUpdate(x)}
                        className="bg-green-700 p-2 cursor-pointer rounded-lg"
                      >
                        submit
                      </button>
                      <button
                        onClick={() => handleAddClick(x.id)}
                        className="bg-red-600 p-2 cursor-pointer rounded-lg"
                      >
                        cancel
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Depart_list;
