import Link from "next/link";
const StudentSidebar = () => {
  return (
    <div className="coordinatorSidebar  mt-14 ">
      <div className="coordinatorSidebarWrapper p-8 ">
        <ul className="flex flex-col gap-6 text-xl">
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/panel/allPanel"}>All Panels</Link>
          </li>

          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/panel/createPanel"}>Create Panel</Link>
          </li>

          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/faculty/home"}>Faculty</Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/panel/projectList"}>All Projects</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default StudentSidebar;
