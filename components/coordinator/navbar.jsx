import { signOut } from "next-auth/react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { NavbarContext } from "./navbarContext";
import { useSession } from "next-auth/react";
import { leaveGroup } from "../../redux/features/student/studentSlice";
const Navbar = () => {
  const { setRender } = useContext(NavbarContext);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { reg_no } = session.user;
  console.log(reg_no);
  console.log(setRender);
  const handleLeaveGroup = () => {
    dispatch(leaveGroup(reg_no));
  };
  return (
    <div className="navbar bg-slate-700 justify-between text-white items-center flex p-8  text-xl">
      <ul className="flex gap-14">
        <li
          onClick={() => setRender("All Projects")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Projects List
        </li>{" "}
        <li
          onClick={() => setRender("Supervised projects")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Supervised projects
        </li>
        <li
          onClick={() => setRender("Project Supervising Requests")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Project Supervising Requests
        </li>
        <li
          onClick={() => setRender("Presentations")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Presentations
        </li>
        <li
          onClick={() => setRender("Panels")}
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
