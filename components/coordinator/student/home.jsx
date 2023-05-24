import { useEffect, useState } from "react";
import Navbar from "../navbar";
import StudentSidebar from "./sidebar/sidebar";
import axios from "axios";
import Table from "./table";
import { useSession } from "next-auth/react";
const StudentHomeCoord = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [student, setStudents] = useState();
  const department_name = session?.user?.department_name;
  useEffect(() => {
    const fetchAllStudents = async () => {
      const resp = await axios.get(
        `http://localhost:3000/api/coordinator/student/home?department_name=${department_name}`
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
          <StudentSidebar />
        </div>
        <div className="rightHomeDashboard ml-72 p-4 mt-24 w-full">
          <span className="flex items-center text-blue-900 justify-center text-3xl mt-8 mb-8">
            All Students of The faculty record
          </span>
          <div className="flex items-center justify-center">
            <Table students={student} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentHomeCoord;
