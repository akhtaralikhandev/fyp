import Navbar from "../../../components/coordinator/navbar";
import CreatePanel from "../../../components/coordinator/panels/createPanel/create";
import Sidebar from "../../../components/coordinator/sidebar/panelSidebar";

const CreatePanelPage = () => {
  return (
    <div className="allPanelPage">
      <Navbar />
      <div className="allPanelPageWrapper w-full flex">
        <div className="leftSide w-64">
          <Sidebar />
        </div>
        <div className="rightSide w-full">
          <CreatePanel />
        </div>
      </div>
    </div>
  );
};
export default CreatePanelPage;
