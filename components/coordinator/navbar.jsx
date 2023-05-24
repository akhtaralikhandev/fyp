import { signOut } from "next-auth/react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavbarContext } from "./navbarContext";
import { useSession } from "next-auth/react";
import { leaveGroup } from "../../redux/features/student/studentSlice";
import { setRender } from "../../redux/features/coordinator/coordinator_slice";
import Link from "next/link";
import { useEffect } from "react";
import Profile from "./home/profile";
const Navbar = () => {
  const render = useSelector((state) => state.coordinator.render);
  console.log(render);
  console.log("this is render");
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const reg_no = session?.user?.reg_no;
  console.log(reg_no);
  console.log(setRender);
  const handleLeaveGroup = () => {
    dispatch(leaveGroup(reg_no));
  };

  return (
    <div className="navbar fixed top-0 w-full  z-10 bg-blue-700 justify-between text-white items-center flex p-4 pl-8 pr-8  text-xl">
      <ul className="flex gap-14">
        <li className="cursor-pointer hover:text-gray-300">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="cursor-pointer hover:text-gray-300">
          <Link href={"/coordinator/profile"}>Profile</Link>
        </li>
        <li className="cursor-pointer hover:text-gray-300 ">
          <Link href={"/coordinator/allProjects/allProjects"}>
            All Projects
          </Link>
        </li>
        <li className="cursor-pointer hover:text-gray-300 ">
          <Link href={"/coordinator/supervision/supervision"}>
            Projects Supervision
          </Link>
        </li>

        <li className="cursor-pointer hover:text-gray-300 ">
          <Link href={"/coordinator/presentations/allPresentation"}>
            Presentations
          </Link>
        </li>
        <li className="cursor-pointer hover:text-gray-300 ">
          <Link href={"/coordinator/panel/allPanel"}>Panels</Link>
        </li>
      </ul>
      <div className="flex flex-col gap-2">
        <Profile />
      </div>
    </div>
  );
};
export default Navbar;
