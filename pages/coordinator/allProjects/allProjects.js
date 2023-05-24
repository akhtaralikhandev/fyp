import AllProjects from "../../../components/coordinator/allProjectsList2";
import Navbar from "../../../components/coordinator/navbar";

const AllProjectsPage = () => {
  return (
    <div className="allProjectsPage">
      <div className="allProjectsPageWrapper">
        <div className="leftSide"></div>
        <div className="rightSide">
          <AllProjects />
        </div>
      </div>
    </div>
  );
};
export default AllProjectsPage;
