import Navbar from "./navbar";
import { NavbarContext } from "./navbarContext";
import { useContext, useEffect } from "react";
import AllProjects from "./allProjectsList2";
import SuperVisedProjectsRequests from "./superVisedRequest";
import SuperVisedProject from "./superProject";
import Presentation from "./presentation";
import Panel from "./panel";
import PresentationList from "./presentation/presentationList";

const Home = () => {
  const { render, setRender } = useContext(NavbarContext);
  useEffect(() => {
    setRender("All Projects");
  }, []);
  return (
    <div className="coordinator_home_comp">
      <div className="coordinator_home_comp">
        <Navbar />
        {render === "All Projects" ? <AllProjects /> : ""}
        {render === "Project Supervising Requests" ? (
          <SuperVisedProjectsRequests />
        ) : (
          ""
        )}
        {render === "Supervised projects" ? <SuperVisedProject /> : ""}
        {render === "Presentations" ? <PresentationList /> : ""}
        {render === "Panels" ? <Panel /> : ""}
      </div>
    </div>
  );
};
export default Home;
