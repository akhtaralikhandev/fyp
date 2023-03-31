import { signOut, getSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavbarContext } from "./navbarContext";
import { useSession } from "next-auth/react";
import {
  HavingProject,
  leaveGroup,
} from "../../redux/features/student/studentSlice";
import LeaveGroup from "./confirm/leaveGroup";
const Navbar = () => {
  const { setRender } = useContext(NavbarContext);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { reg_no } = session.user;
  console.log(reg_no);
  console.log(setRender);
  const handleLeaveGroup = () => {
    dispatch(leaveGroup(reg_no));
    dispatch(HavingProject(false));
  };
  return (
    <div className="navbar bg-slate-700 justify-between text-white items-center flex p-8  text-xl">
      <ul className="flex gap-14">
        <li
          onClick={() => setRender("Project Detail")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Project Detail
        </li>{" "}
        <li
          onClick={() => setRender("Group Members")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Group Members
        </li>
        <li
          onClick={() => setRender("Presentation")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Presentation
        </li>
        <li
          onClick={() => setRender("join requests")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          join requests
        </li>
        <li
          className=" cursor-pointer hover:text-gray-300 "
          onClick={() => setRender("Edit Project")}
        >
          Edit Project
        </li>
      </ul>
      <div className="flex flex-col gap-2">
        <button
          className="  bg-slate-500 p-2 rounded-lg hover:text-black hover:bg-slate-300 right-12 top-8"
          onClick={() => signOut()}
        >
          sign out
        </button>
        <span>
          <LeaveGroup />
        </span>
      </div>
    </div>
  );
};
export default Navbar;
