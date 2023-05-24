import Navbar from "../navbar";
import Sidebar from "./sidebar";

const CooSuperVisioned = () => {
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
          <span>This page is both for supervisor and Co Super Visor</span>
        </div>
      </div>
    </div>
  );
};
export default CooSuperVisioned;
