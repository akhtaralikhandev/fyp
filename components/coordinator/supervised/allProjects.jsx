import Navbar from "../navbar";
import Sidebar from "./sidebar";

const AllProjectsSupervised = () => {
  return (
    <div>
      <div className="navbarSupervisioned">
        <Navbar />
      </div>
      <div className="mainbody flex">
        <div className="leftside">
          <Sidebar />
        </div>
        <div className="rightside mt-24 m-2">
          <span>All of Supervised projects are here</span>
        </div>
      </div>
    </div>
  );
};
export default AllProjectsSupervised;
