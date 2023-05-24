import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="coordinatorSidebar bg-slate-200   mt-14 ">
      <div className="coordinatorSidebarWrapper p-8 ">
        <ul className="flex flex-col gap-6 text-xl">
          <Link href={"/"}>
            <li className=" cursor-pointer  hover:bg-blue-600 hover:text-white p-2 rounded-lg">
              Home
            </li>
          </Link>

          <Link href={"/employee/panel/panel"}>
            <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
              Panel
            </li>
          </Link>

          <Link href={"/coordinator/supervision/coSupervisioned"}>
            <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
              Co Supervisor
            </li>{" "}
          </Link>
          <Link href={"/employee/requests"}>
            {" "}
            <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
              New Requests
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
