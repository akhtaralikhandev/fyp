import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  updateDepartments,
} from "../../redux/features/superAdmin/superAdminSlice";
import List from "./list";

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
      <div className="depart_list_wrapper flex items-center justify-center gap-6 flex-col">
        <ul className="flex w-full gap-24   xl:pl-12 xl:pr-12  justify-between text-2xl text-white">
          <li className="flex-1 items-center justify-center">Name</li>
          <li className=" flex-1 items-center justify-center">
            Coordinator Email
          </li>
          <li className=" text-center justify-center text-white p-2 rounded-lg cursor-pointer flex-1 items-center">
            Edit
          </li>
          <li className="text-center justify-center text-white p-2 rounded-lg cursor-pointer flex-1 items-center">
            Remove
          </li>
        </ul>
        {departements.map((x) => (
          <List x={x} />
        ))}
      </div>
    </div>
  );
};

export default Depart_list;
