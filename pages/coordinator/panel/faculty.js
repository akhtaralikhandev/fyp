import Navbar from "../../../components/coordinator/navbar";
import FacultyPage from "../../../components/coordinator/panels/faculty/faculty";
import Sidebar from "../../../components/coordinator/sidebar/panelSidebar";

const FacultyPanelPage = () => {
  return (
    <div className="allPanelPage">
      <Navbar />
      <div className="allPanelPageWrapper flex">
        <div className="leftSide">
          <Sidebar />
        </div>
        <div className="rightSide mt-24">
          <FacultyPage />
        </div>
      </div>
    </div>
  );
};
export default FacultyPanelPage;
