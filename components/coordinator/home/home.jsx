import Navbar from "../navbar";
import Sidebar from "./sidebar";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPanels } from "../../../redux/features/panel/panelSlice";
import { fetchPresentations } from "../../../redux/features/presentations/presentationSlice";

import { fetchAllProjects } from "../../../redux/features/project/projectSlice";
import Link from "next/link";
const HomeDashboard = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const coordinator_depart = session?.user?.coordinator_depart;
  const user = useSelector((state) => state.user.user);
  const allPanels = useSelector((state) => state?.panel?.panel);
  const allPresentations = useSelector(
    (state) => state?.presentation?.presentations
  );
  const allProjects = useSelector((state) => state?.project?.allProjects);
  console.log(allProjects);
  console.log(allPresentations);
  console.log(allPanels);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  const monthName = months[now.getMonth()];
  const day = ("0" + now.getDate()).slice(-2);
  const year = now.getFullYear();
  // const hour = ("0" + now.getHours()).slice(-2);
  // const minute = ("0" + now.getMinutes()).slice(-2);
  // const second = ("0" + now.getSeconds()).slice(-2);
  const dateTime = `${monthName} ${day} ${year} `;

  console.log(dateTime);
  useEffect(() => {
    console.log("fetch method is calleddd");
    dispatch(fetchPanels(coordinator_depart));
  }, []);
  useEffect(() => {
    dispatch(fetchPresentations(coordinator_depart));
  }, []);
  useEffect(() => {
    dispatch(fetchAllProjects(coordinator_depart));
  }, []);
  const name = session?.user?.name;
  return (
    <div className="homeDashboard flex">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="homeDashboardWrapper flex">
        <div className="leftHomeDashboard">
          <Sidebar />
        </div>
        <div className="rightHomeDashboard ml-72 p-4 mt-24 w-full">
          <div className="flex  p-4 items-center gap-8 shadow-lg rounded-lg  homeWelcomeNote">
            <div>
              <img
                className="h-16 rounded-lg object-contain"
                src="https://media.gettyimages.com/id/1314489757/photo/smiling-hispanic-man-against-white-background.jpg?s=612x612&w=gi&k=20&c=mU_OXyCcBWewSUuA-IQE7LYuwo7FtHqX8pVnpNSSXcQ="
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <span className="text-3xl font-bold text-blue-900">
                Welcome ,{name}!
              </span>
              <span className="text-slate-500">
                These are your analytics stats for today {dateTime}
              </span>
            </div>
          </div>
          <div className="dashboards  mt-12 flex items-center  justify-center flex-wrap gap-14 p-2">
            <div className="panelsDashboard rounded-lg shadow-lg p-6   flex flex-col gap-6">
              <span className="text-xl">Total Panels</span>
              <div className="flex gap-12 items-center">
                <div className="bg-green-500 p-2 w-24 flex items-center justify-center">
                  <span className="text-5xl text-white">
                    <i class="fa fa-bar-chart" aria-hidden="true"></i>
                  </span>
                </div>
                <span className="text-5xl">{allPanels?.length}</span>
              </div>{" "}
              <Link href={"/coordinator/panel/allPanel"}>
                <span className="border w-32 p-2 cursor-pointer hover:border-none hover:text-white hover:bg-green-500 border-green-700 flex items-center justify-center">
                  View Detail
                </span>{" "}
              </Link>
            </div>
            <div className="panelsDashboard rounded-lg shadow-lg p-6   flex flex-col gap-6">
              <span className="text-xl">Presentations</span>
              <div className="flex gap-12 items-center">
                <div className="bg-blue-500 p-2 w-24 flex items-center justify-center">
                  <span className="text-5xl text-white">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </span>
                </div>
                <span className="text-5xl">{allPresentations?.length}</span>
              </div>{" "}
              <Link href={"/coordinator/presentations/allPresentation"}>
                <span className="border w-32 p-2 cursor-pointer hover:border-none hover:text-white hover:bg-blue-500 border-green-700 flex items-center justify-center">
                  View Detail{" "}
                </span>{" "}
              </Link>
            </div>
            <div className="panelsDashboard  shadow-lg p-6  flex flex-col gap-6">
              <span className="text-xl">Faculty members</span>
              <div className="flex gap-12 items-center">
                <div className="bg-yellow-500 p-2 w-24 flex items-center justify-center">
                  <span className="text-5xl text-white">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <span className="text-5xl">40</span>
              </div>
              <Link href={"/coordinator/faculty/home"}>
                <span className="border w-32 p-2 cursor-pointer hover:border-none hover:text-white hover:bg-yellow-500 border-green-700 flex items-center justify-center">
                  View Detail
                </span>
              </Link>
            </div>
            <div className="panelsDashboard rounded-lg shadow-lg p-6   flex flex-col gap-6">
              <span className="text-xl">Projects</span>
              <div className="flex gap-12 items-center">
                <div className="bg-red-500 p-2 w-24 flex items-center justify-center">
                  <span className="text-5xl text-white">
                    <i class="fa fa-dashboard" aria-hidden="true"></i>
                  </span>
                </div>
                <span className="text-5xl">{allProjects?.length}</span>
              </div>
              <Link href={"/coordinator/allProjects/allProjects"}>
                <span className="border w-32 p-2 cursor-pointer hover:border-none hover:text-white hover:bg-red-500 border-green-700 flex items-center justify-center">
                  View Detail
                </span>{" "}
              </Link>
            </div>
            <div className="panelsDashboard rounded-lg shadow-lg p-6   flex flex-col gap-6">
              <span className="text-xl">Students</span>
              <div className="flex gap-12 items-center">
                <div className=" bg-amber-600 p-2 w-24 flex items-center justify-center">
                  <span className="text-5xl text-white">
                    <i class="fa fa-group" aria-hidden="true"></i>
                  </span>
                </div>
                <span className="text-5xl">40</span>
              </div>
              <Link href={"/coordinator/students/home"}>
                <span className="border w-32 p-2 cursor-pointer hover:border-none hover:text-white hover:bg-amber-600 border-green-700 flex items-center justify-center">
                  View Detail
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeDashboard;
// <div className="profiledashboard">
//   <div
//     className="rightHomeDashboard w-full flex gap-4  "
//     style={{ flex: "2" }}
//   >
//     <div className="aboutme">
//       <div className="profileWrapper p-4 flex flex-col items-center gap-6 justify-center">
//         <img
//           src="/images/Image.jpg"
//           className="w-24 h-24 rounded-full object-cover"
//           alt=""
//         />{" "}
//         <span className="text-slate-700 xl:text-3xl font-bold">
//           About Me
//         </span>
//         <div>
//           <span>Name : </span> <span>{user?.name}</span>
//         </div>
//         <div>
//           <span>Department : </span> <span>{user?.department_name}</span>
//         </div>
//         <div>
//           <span>Email : </span> <span>{user?.email}</span>
//         </div>
//         <div>
//           <span>Role : </span> <span>{user?.role}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>;
