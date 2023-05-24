import Navbar from "./navbar";
import { NavbarContext } from "./navbarContext";
import { useContext, useEffect } from "react";
import AllProjects from "./allProjectsList2";
import SuperVisedProjectsRequests from "./superVisedRequest";
import SuperVisedProject from "./superProject";
import Presentation from "./presentation";
import Panel from "./panel";
import PresentationList from "./presentation/presentationList";
import { useDispatch, useSelector } from "react-redux";
import { setRender } from "../../redux/features/coordinator/coordinator_slice";
import Profile from "./profile";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRender("All Projects"));
  }, []);
  const render = useSelector((state) => state.coordinator.render);

  return (
    <div className="coordinator_home_comp">
      <div className="coordinator_home_comp">
        <Navbar />
        {render === "allProjects" ? <AllProjects /> : ""}
        {render === "Project Supervising Requests" ? (
          <SuperVisedProjectsRequests />
        ) : (
          ""
        )}
        {render === "Supervised projects" ? <SuperVisedProject /> : ""}
        {render === "Presentations" ? <PresentationList /> : ""}
        {render === "Panels" ? <Panel /> : ""}
        {render === "profile" ? <Profile /> : ""}
      </div>
    </div>
  );
};
export default Home;
