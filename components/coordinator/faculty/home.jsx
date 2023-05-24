import Navbar from "../navbar";
import FacultySidebar from "./sidebar/sidebar";
import FacultyTable from "./table";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
const FacultyHomeAdmin = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [student, setStudents] = useState();
  const department_name = session?.user?.department_name;
  useEffect(() => {
    const fetchAllStudents = async () => {
      const resp = await axios.get(
        `http://localhost:3000/api/coordinator/faculty/home?department_name=${department_name}`
      );
      console.log(resp.data);
      setStudents(resp.data);
      return resp.data;
    };
    fetchAllStudents();
  }, []);
  return (
    <div className="homeDashboard flex">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="homeDashboardWrapper flex">
        <div className="leftHomeDashboard fixed w-64">
          <FacultySidebar />
        </div>
        <div className="rightHomeDashboard ml-72 p-4 mt-24 w-full">
          <span className="flex items-center text-blue-900 justify-center text-3xl mt-8 mb-8">
            All Faculty of the department {department_name} record
          </span>
          <div className="flex items-center justify-center">
            <FacultyTable list={student} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FacultyHomeAdmin;
