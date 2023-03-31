import { signOut } from "next-auth/react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { NavbarContext } from "../coordinator/navbarContext";
import { setRender } from "../../redux/features/employee/employeeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const render = useSelector((state) => state.student.render);
  console.log(render);
  return (
    <div className="navbar bg-slate-700 justify-between text-white items-center flex p-8  text-xl">
      <ul className="flex gap-14">
        <li
          onClick={() => dispatch(setRender("All Projects"))}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Supervising Projects
        </li>{" "}
        <li
          onClick={() => dispatch(setRender("Presentations"))}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Presentations
        </li>
        <li
          onClick={() => dispatch(setRender("panel"))}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Panels
        </li>
      </ul>
      <div className="flex flex-col gap-2">
        <button
          className="  bg-slate-500 p-2 rounded-lg hover:text-black hover:bg-slate-300 right-12 top-8"
          onClick={() => signOut()}
        >
          sign out
        </button>
      </div>
    </div>
  );
};
export default Navbar;
