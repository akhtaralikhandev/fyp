import Panel from "./panel";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useContext } from "react";
import { NavbarContext } from "../navbarContext";
import ViewPanel from "./viewPanel";
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
    <div className="panelList">
      <div className="panelList_wrapper">
        {viewMore ? (
          <ViewPanel />
        ) : (
          <table className="table  mt-8 bg-slate-200 w-full   border-collapse border-slate-500  ">
            <tbody>
              <tr className="bg-slate-600  border-blue-500 text-3xl text-white">
                <th className="border text-center p-2">Project Id</th>
                <th className="border text-center p-2">Total Employees</th>
                <th className="border text-center p-2">Total Project</th>
                <th className="border text-center p-2">View More</th>
              </tr>
              {allPanels?.map((x) => (
                <Panel panel={x} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default PanelList;
