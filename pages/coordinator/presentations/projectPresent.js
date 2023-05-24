import PresentationList from "../../../components/coordinator/presentation/projectPresent";
import { useSelector } from "react-redux";
const AllPresentationsPage = () => {
  const projects = useSelector((state) => state.coordinator.projects.projects);

  return (
    <div className="allPresentations">
      <div className="allPresentationsWrapper">
        <PresentationList allPresentations={projects} />
      </div>
    </div>
  );
};
export default AllPresentationsPage;
