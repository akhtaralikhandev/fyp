import Panel from "./panel";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useContext } from "react";
import { NavbarContext } from "../navbarContext";
import ViewPanel from "./viewPanel";
import Link from "next/link";
const PanelList = () => {
  const allPanels = useSelector((state) => state.panel.panel);
  console.log("all Panels here");
  console.log(allPanels);
  const { viewMore } = useContext(NavbarContext);
  console.log("view more");
  console.log(viewMore);
  const router = useRouter();
  const ViewMore = () => {
    router.push("");
  };
  return (
    <div className="panelList  ">
      <div className="panelList_wrapper">
        {viewMore ? (
          <ViewPanel />
        ) : (
          <div className="pl-64">
            <span className="flex   xl:text-4xl font-bold text-slate-700">
              All Panels List of FCSE
            </span>
            {allPanels?.length > 0 ? (
              <div className="mt-14 flex flex-col gap-4">
                <span className="text-2xl mb-12 w-full flex items-center justify-center">
                  Total Number of Panels : {allPanels?.length}{" "}
                </span>
                <div className="flex gap-8 flex-wrap w-full items-center justify-center">
                  {allPanels?.map((x) => (
                    <Link href={`/coordinator/panel/${x?.id}`}>
                      <div className=" shadow-lg p-8 gap-6 flex flex-col rotating-div rounded-lg cursor-pointer">
                        <div className="flex gap-8 items-center">
                          <span className="text-3xl flex-1 flex items-center text-blue-600 ">
                            Id
                          </span>{" "}
                          <span className="text-xl flex-1 flex items-center  ">
                            {x?.id}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-8 items-center">
                            <span className="text-xl flex-1 flex items-center text-blue-600 ">
                              Faculty Members
                            </span>{" "}
                            <span className="text-xl flex-1 flex items-center  ">
                              {x?.Employees?.length}
                            </span>
                          </div>
                          <div className="flex gap-8 items-center">
                            <span className="text-xl flex-1 flex items-center text-blue-600 ">
                              No of Projects
                            </span>{" "}
                            <span className="text-xl flex-1 flex items-center  ">
                              {x?.projects?.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <span>No panel is available plz create one</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default PanelList;
