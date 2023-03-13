import Main from "../../components/main";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Table from "../../components/supervisor/table";
import wrapper from "../../redux/app/store";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard_wrapper flex gap-4 relative">
        {/* <div
          style={{ flex: "1" }}
          className="dashboard_sidebar md:block hidden"
        >
          <Sidebar />
        </div> */}
        <div style={{ flex: "3" }} className="dashboard_main">
          <Navbar />
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
