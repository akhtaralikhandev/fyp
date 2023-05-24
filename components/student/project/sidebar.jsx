import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="coordinatorSidebar  mt-24 w-64 ">
      <div className="coordinatorSidebarWrapper p-8 ">
        <ul className="flex flex-col gap-6 text-xl">
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/"}>Project Details</Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/student/members"}>Members</Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/student/supervisor"}>Supervisor</Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/student/coSupervisor"}>Co Supervisor</Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/student/request"}>New Requests</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
