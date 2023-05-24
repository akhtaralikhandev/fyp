import Navbar from "../../../components/coordinator/navbar";
import AllProjectsPanel from "../../../components/coordinator/panels/projects/allProjects";
import Sidebar from "../../../components/coordinator/sidebar/panelSidebar";

const CreatePanelPage = () => {
  return (
    <div className="allPanelPage">
      <Navbar />
      <div className="allPanelPageWrapper">
        <div className="leftSide">
          <Sidebar />
        </div>
        <div className="rightSide  mt-24">
          <AllProjectsPanel />
        </div>
      </div>
    </div>
  );
};
export default CreatePanelPage;
