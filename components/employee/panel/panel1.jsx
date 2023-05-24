import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { fetchEmployee } from "../../../redux/features/employee/employeeSlice";
const PanelComp = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const panel2 = useSelector((state) => state.employee.employee?.Panel);
  useEffect(() => {
    dispatch(fetchEmployee(email));
  }, []);
  console.log("Panel2");
  console.log(panel2);
  return (
    <div className="w-full">
      <div className="navbarSupervisioned">
        <Navbar />
      </div>
      <div className="mainbody flex ">
        <div className="leftside w-72">
          <Sidebar />
        </div>
        <div className="rightside mt-24 m-2 w-full">
          <span>This is the panel page ok done </span>
        </div>
      </div>
    </div>
  );
};
export default PanelComp;
