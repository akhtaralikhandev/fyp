import Navbar from "./navbar";
import { NavbarContext } from "./navbarContext";
import { useContext } from "react";
import AllProjects from "./allProjectsList2";
import SuperVisedProjectsRequests from "./superVisedRequest";
import SuperVisedProject from "./superProject";
import Presentation from "./presentation";
import Panel from "./panel";

const Home = () => {
  const { render } = useContext(NavbarContext);
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
        {render === "Presentations" ? <Presentation /> : ""}
        {render === "Panels" ? <Panel /> : ""}
      </div>
    </div>
  );
};
export default Home;
