import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const panelRender = useSelector((state) => state.coordinator.panelRender);
  console.log(panelRender);
  return (
    <div className="coordinatorSidebar  mt-14 ">
      <div className="coordinatorSidebarWrapper p-8 ">
        <ul className="flex flex-col gap-6 text-xl">
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/supervision/allProjects"}>
              All Projects
            </Link>
          </li>

          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/supervision/supervision"}>
              Supervisor
            </Link>
          </li>

          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/supervision/coSupervisioned"}>
              Co Supervisor
            </Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/supervision/newRequest"}>
              New Requests
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
