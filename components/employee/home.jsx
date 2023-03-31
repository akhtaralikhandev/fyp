import Navbar from "./navbar";
import { useContext, useEffect } from "react";
import { NavbarContext } from "../coordinator/navbarContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployee,
  setRender,
} from "../../redux/features/employee/employeeSlice";
import Project from "./projects/project";
import AllProjects from "./projects/allProjectList";
import Panel from "./panel/panel";
import { useSession } from "next-auth/react";
import Presentation from "./presentation/presentation";

const Home = () => {
  const dispatch = useDispatch();
  const render = useSelector((state) => state.employee.render);
  const { data: session } = useSession();
  const { email } = session?.user;
  console.log(render);
  useEffect(() => {
    dispatch(setRender("All Projects"));
  }, []);
  useEffect(() => {
    dispatch(fetchEmployee(email));
  }, []);
  return (
    <div className="coordinator_home_comp">
      <div className="coordinator_home_comp">
        <Navbar />
        {render === "All Projects" && <AllProjects />}
        {render === "panel" && <Panel />}
        {render === "Presentations" && <Presentation />}
      </div>
    </div>
  );
};
export default Home;
