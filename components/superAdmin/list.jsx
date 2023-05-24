import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  updateDepartments,
} from "../../redux/features/superAdmin/superAdminSlice";
const List = ({ x }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(x?.name);
  const [departAddStates, setDepartAddStates] = useState({});
  const [coordinatorEmail, setCoordinatorEmail] = useState(
    x?.coordinator_email
  );
  const [coordinator_email, setCoordinator_email] = useState("");
  const departements = useSelector((state) => state.superAdmin.departments);
  console.log(departements);
  const dispatch = useDispatch();
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
    <>
      <ul className="flex w-full gap-24   xl:pl-12 xl:pr-12  justify-between text-2xl text-white">
        <li className="flex-1 items-center justify-center">{x.name}</li>
        <li className=" flex-1 items-center justify-center">
          {x.coordinator_email ? (
            <span className="">{x.coordinator_email}</span>
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
                    className="bg-green-700 hover:bg-green-500 p-2 cursor-pointer rounded-lg"
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
        <li
          onClick={() => setEdit(!edit)}
          className="bg-green-700 hover:bg-green-500 text-center justify-center text-white p-2 rounded-lg cursor-pointer flex-1 items-center"
        >
          Edit
        </li>
        <li className="bg-green-700 hover:bg-green-500 text-center justify-center text-white p-2 rounded-lg cursor-pointer flex-1 items-center">
          Remove
        </li>
      </ul>
      {edit ? (
        <ul className="flex w-full gap-24   xl:pl-12 xl:pr-12  justify-between text-2xl text-white">
          <li className="flex-1 items-center justify-center">
            <input
              type="text"
              className="p-2 rounded-lg outline-blue-500 text-black"
              placeholder="write department name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li className=" flex-1 items-center justify-center">
            <input
              type="text"
              className="p-2 rounded-lg outline-blue-500 text-black"
              placeholder="write coordinator email"
              value={coordinatorEmail}
              onChange={(e) => setCoordinatorEmail(e.target.value)}
            />
          </li>
          <li className="bg-green-700 hover:bg-green-500 text-center justify-center text-white p-2 rounded-lg cursor-pointer flex-1 items-center">
            Submit
          </li>
          <li
            onClick={() => setEdit(!edit)}
            className="bg-red-700 hover:bg-red-500 text-center justify-center text-white p-2 rounded-lg cursor-pointer flex-1 items-center"
          >
            Cancel
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};
export default List;
