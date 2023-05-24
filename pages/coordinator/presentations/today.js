import PresentationList from "../../../components/coordinator/presentation/presentationList";
import { useSelector } from "react-redux";
const AllPresentationsPage = () => {
  const today = new Date().toLocaleDateString(); // Get current date as a string in local time zone
  const presentationsToday = useSelector((state) =>
    state.coordPresentation.allPresentations.filter(
      (presentation) =>
        new Date(presentation.date).toLocaleDateString() === today
    )
  );

  return (
    <div className="allPresentations">
      <div className="allPresentationsWrapper">
        <PresentationList allPresentations={presentationsToday} />
      </div>
    </div>
  );
};
export default AllPresentationsPage;
