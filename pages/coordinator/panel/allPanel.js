import Navbar from "../../../components/coordinator/navbar";
import PanelList from "../../../components/coordinator/panels/panelList";
import Sidebar from "../../../components/coordinator/sidebar/panelSidebar";

const AllPanelPage = () => {
  return (
    <div className="allPanelPage">
      <Navbar />
      <div className="allPanelPageWrapper">
        <div className="leftSide">
          <Sidebar />
        </div>
        <div className="rightSide">
          <PanelList />
        </div>
      </div>
    </div>
  );
};
export default AllPanelPage;
