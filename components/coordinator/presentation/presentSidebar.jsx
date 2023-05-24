import { useDispatch, useSelector } from "react-redux";
import { setPresentationRender } from "../../../redux/features/coordinator/coordinator_slice";
import Link from "next/link";

const Sidebar = () => {
  const dispatch = useDispatch();
  const presentationRender = useSelector(
    (state) => state.coordinator.presentationsRender
  );
  console.log(presentationRender);
  return (
    <div className="allPresentionSidebar mt-20">
      <div className="allPresentationSidebarWrapper p-8 ">
        <ul className="flex flex-col gap-4 text-xl">
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/presentations/allPresentation"}>
              All Presentations
            </Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/presentations/create"}>
              Create Presentation
            </Link>
          </li>

          <li
            onClick={() => dispatch(setPresentationRender("Completed"))}
            className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg"
          >
            <Link href={"/coordinator/presentations/completed"}>
              Completed Presentations
            </Link>
          </li>
          <li
            onClick={() => dispatch(setPresentationRender("Pending"))}
            className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg"
          >
            <Link href={"/coordinator/presentations/pending"}>
              Pending Presentations
            </Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/presentations/today"}>
              Today's Presentations
            </Link>
          </li>
          <li className=" cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded-lg">
            <Link href={"/coordinator/presentations/projectPresent"}>
              Presentation's By Projects
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
