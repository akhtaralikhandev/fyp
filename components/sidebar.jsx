const Sidebar = () => {
  return (
    <div className="sidebar bg-slate-300  sticky">
      <div className="sidebar_wrapper p-8 pt-4 flex flex-col gap-8">
        <div className="sidebar_top flex flex-col gap-4">
          <span className="p-4 xl:text-4xl text-blue-700 italic">FYP </span>
          <div className="flex w-full p-2 items-center gap-4 text-xl hover:text-white  cursor-pointer hover:bg-slate-700 sm:text-2xl md:text-2xl">
            <i class="fa fa-home" aria-hidden="true"></i>
            <span>Dashboards</span>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
          <div className="flex items-center  gap-4  justify-center">
            <span className="w-12 h-1 bg-gray-400"></span>
            <span>Pages</span>
            <span className="w-12 h-1 bg-gray-400"></span>
          </div>
        </div>
        <ul className="flex flex-col gap-4 items-start w-full">
          <li className="flex w-full p-2 items-center gap-4 text-xl hover:text-white  cursor-pointer hover:bg-slate-700 sm:text-2xl md:text-2xl">
            <i class="fa fa-envelope" aria-hidden="true"></i> Email
          </li>
          <li className="flex w-full p-2 items-center gap-4 text-xl hover:text-white  cursor-pointer hover:bg-slate-700 sm:text-2xl md:text-2xl">
            <i class="fa fa-group" aria-hidden="true"></i> Groups
          </li>
          <li className="flex w-full p-2 items-center gap-4 text-xl hover:text-white  cursor-pointer hover:bg-slate-700 sm:text-2xl md:text-2xl">
            <i class="fa fa-shield" aria-hidden="true"></i> Roles and
            Permissions
          </li>
          <li className="flex w-full p-2 items-center gap-4 text-xl hover:text-white  cursor-pointer hover:bg-slate-700 sm:text-2xl md:text-2xl">
            <i class="fa fa-user" aria-hidden="true"></i> Students
          </li>
          <li className="flex w-full p-2 items-center gap-4 text-xl hover:text-white  cursor-pointer hover:bg-slate-700 sm:text-2xl md:text-2xl">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i> Faculty
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
