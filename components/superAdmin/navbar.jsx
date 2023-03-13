import { signOut } from "next-auth/react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { NavbarContext } from "./navbarContext";
import { useSession } from "next-auth/react";
import { leaveGroup } from "../../redux/features/student/studentSlice";
const Navbar = () => {
  const { setRender, render } = useContext(NavbarContext);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { reg_no } = session.user;
  console.log(reg_no);
  console.log(render);
  const handleLeaveGroup = () => {
    dispatch(leaveGroup(reg_no));
  };
  return (
    <div className="navbar bg-slate-700 justify-between text-white items-center flex p-8  text-xl">
      <ul className="flex gap-14">
        <li
          onClick={() => setRender("depart_list")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          View Departments
        </li>{" "}
        <li
          onClick={() => setRender("add_department")}
          className=" cursor-pointer hover:text-gray-300 "
        >
          Add Departments
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
