import { useContext, useEffect } from "react";
import PresentationList from "../../../components/coordinator/presentation/presentationList";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { NavbarContext } from "../../../components/coordinator/navbarContext";
import { fetchAllPresentations } from "../../../redux/features/coordinator/coordPresentationSlice";
const AllPresentationsPage = () => {
  const { data: session } = useSession();
  const { list, setList } = useContext(NavbarContext);
  const dispatch = useDispatch();
  // const allPresentations = useSelector(
  //   (state) => state.coordPresentation.allPresentations
  // );
  const department_name = session?.user?.department_name;
  const allPresentations = useSelector(
    (state) => state.coordPresentation.allPresentations
  );
  useEffect(() => {
    dispatch(fetchAllPresentations(department_name));
  }, [dispatch]);
  setList(allPresentations);
  console.log("these are all presentation ");
  console.log(allPresentations);
  return (
    <div className="allPresentations">
      <div className="allPresentationsWrapper">
        <PresentationList allPresentations={list} />
      </div>
    </div>
  );
};
export default AllPresentationsPage;
